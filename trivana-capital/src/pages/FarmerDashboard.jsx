import React, { useState } from "react";
import "../styles/FarmerDashboard.css";

const CROP_LIST = ["Rice", "Wheat", "Sugarcane", "Maize", "Other"];
const EXP_CAT = ["Fertilizer", "Seed", "Labor", "Pesticide", "Water", "Other"];
const COLORS = ["#38bdf8", "#fbbf24", "#22c55e", "#ef4444", "#6366f1", "#f472b6"];

function getTotal(arr, field) {
  return arr.length ? arr.reduce((s, a) => s + Number(a[field] || 0), 0) : 0;
}

export default function FarmerDashboard() {
  // CROP CYCLES
  const [cycles, setCycles] = useState([
    {
      id: 1,
      crop: "Rice",
      variety: "Basmati-385",
      area: 4,
      year: "2025",
      status: "Active",
      inputs: [
        { id: 1, type: "Organic Fertilizer", desc: "Compost", qty: 250, unit: "kg", cost: 3000, date: "2025-06-05" },
        { id: 2, type: "Medicinal Fertilizer", desc: "Neem Cake", qty: 80, unit: "kg", cost: 1200, date: "2025-06-15" },
      ],
      operations: [
        { id: 1, name: "Sowing", date: "2025-06-10", area: 4, cost: 900, notes: "Good condition" },
        { id: 2, name: "Weeding", date: "2025-07-01", area: 4, cost: 300, notes: "" }
      ],
      outputs: [
        { id: 1, date: "2025-10-10", expYield: 40, estPrice: 2300, actYield: 37, sold: 35, soldPrice: 2200, revenue: 77000 }
      ],
      spoilage: [
        { id: 1, date: "2025-10-09", qty: 2, reason: "Rain", valueLoss: 4400 }
      ],
      expenses: [
        { id: 1, date: "2025-06-05", desc: "Compost", cat: "Fertilizer", amount: 3000 },
        { id: 2, date: "2025-06-10", desc: "Sowing labor", cat: "Labor", amount: 900 }
      ],
      sales: [
        { id: 1, date: "2025-10-14", qty: 35, unit: "qtl", price: 2200, amount: 77000 }
      ],
      tasks: [
        { id: 1, name: "Apply fertilizer", due: "2025-06-05", done: true, notes: "" },
        { id: 2, name: "Irrigate field", due: "2025-06-22", done: false, notes: "" },
        { id: 3, name: "Harvest", due: "2025-10-10", done: false, notes: "" }
      ]
    }
  ]);
  const [active, setActive] = useState(cycles[0].id);

  // Modals
  const [modal, setModal] = useState(null); // {type, data}
  const [formData, setFormData] = useState({});
  
  const record = cycles.find(r => r.id === active);
  const typeMap = {
    input: "Input",
    operation: "Operation",
    output: "Output",
    spoilage: "Spoilage",
    expense: "Expense",
    sale: "Sale",
    task: "Task",
    cycle: "Cycle"
  };

  // ---------- CRUD handlers ----------
  function openModal(type, data = {}) {
    setModal({ type, data });
    setFormData(data);
  }
  function closeModal() { setModal(null); setFormData({}); }

  function upsertSection(field) {
    const idKey = formData.id || Date.now();
    setCycles(cycles => cycles.map(c =>
      c.id !== active ? c : {
        ...c,
        [field]: formData.id
          ? c[field].map(x => x.id === formData.id ? { ...formData } : x)
          : [...c[field], { ...formData, id: idKey }]
      }
    ));
    closeModal();
  }
  function deleteSection(field, id) {
    setCycles(cycles => cycles.map(c =>
      c.id !== active ? c : { ...c, [field]: c[field].filter(e => e.id !== id) }
    ));
  }

  function addCycle(form) {
    const id = Date.now();
    setCycles([...cycles, { ...form, id, status: "Active", inputs: [], operations: [], outputs: [], spoilage: [], expenses: [], sales: [], tasks: [] }]);
    setActive(id);
    closeModal();
  }
  function archiveCycle() {
    setCycles(cycles.map(c => c.id === active ? { ...c, status: "Archived" } : c));
    setActive(cycles.find(c => c.id !== active)?.id || null);
  }
  // --- Analytics ---
  const pieData = EXP_CAT.map(cat => ({
    name: cat,
    value: getTotal((record.expenses || []).filter(e => e.cat === cat), "amount"),
  })).filter(d => d.value);

  // Main Render
  return (
    <div className="dashboard-root">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">🚜<span>Crop Manager</span></div>
        <button className="sidebar-add" onClick={() => openModal("cycle")}>+ New Cycle</button>
        {cycles.map(c =>
          <button className={`sidebar-item ${c.id === active ? "active" : ""}`} key={c.id}
            onClick={() => setActive(c.id)}>
            <div className="sidebar-main">{c.crop} ({c.variety})</div>
            <div className="sidebar-meta">{c.area} ac | {c.year}</div>
            <span className={`sidebar-status ${c.status}`}>{c.status}</span>
          </button>
        )}
      </aside>
      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {record ? <>
          <div className="main-header">
            <h1>{record.crop} ({record.variety}) <span className={`status-chip ${record.status}`}>{record.status}</span></h1>
            <div>{record.year} | {record.area} acre</div>
            {record.status === "Active" && (
              <button className="btn-archive" onClick={archiveCycle}>Archive Cycle</button>
            )}
          </div>
          <SummaryGrid record={record} />
          <SectionTable
            title="Inputs Used"
            columns={["Type", "Description", "Qty", "Unit", "Cost (₹)", "Date"]}
            rows={record.inputs}
            field="inputs"
            openModal={openModal}
            deleteSection={deleteSection}
          />
          <SectionTable
            title="Field Operations"
            columns={["Operation", "Date", "Area", "Cost (₹)", "Notes"]}
            rows={record.operations}
            field="operations"
            openModal={openModal}
            deleteSection={deleteSection}
          />
          <SectionTable
            title="Yield & Outputs"
            columns={["Date", "Exp.Yield", "Est.Price", "Act.Yield", "Sold", "Sold Price", "Revenue"]}
            rows={record.outputs}
            field="outputs"
            openModal={openModal}
            deleteSection={deleteSection}
          />
          <SectionTable
            title="Spoilage & Loss"
            columns={["Date", "Qty", "Reason", "Value Loss"]}
            rows={record.spoilage}
            field="spoilage"
            openModal={openModal}
            deleteSection={deleteSection}
          />
          <SectionTable
            title="Expenses"
            columns={["Date", "Desc", "Cat", "Amount (₹)"]}
            rows={record.expenses}
            field="expenses"
            openModal={openModal}
            deleteSection={deleteSection}
          />
          <SectionTable
            title="Sales"
            columns={["Date", "Qty", "Unit", "Price", "Amount"]}
            rows={record.sales}
            field="sales"
            openModal={openModal}
            deleteSection={deleteSection}
          />
          <SectionTable
            title="Tasks"
            columns={["Name", "Due", "Done", "Notes"]}
            rows={record.tasks}
            field="tasks"
            openModal={openModal}
            deleteSection={deleteSection}
          />
          {/* <div className="section">
            <div className="section-title">Expense Analytics</div>
            <div className="chart-demo">
              <PieDemo data={pieData} />
            </div>
          </div> */}
        </>
          : <div className="section empty-state">Select or add a cycle.</div>
        }
      </main>

      {/* MODALS */}
      {modal && (
        <Modal title={`${modal.data.id ? "Edit" : "Add"} ${typeMap[modal.type]}`}
          onClose={closeModal}
          onSave={() => {
            if (modal.type === "cycle") addCycle(formData);
            else upsertSection(modal.type + (modal.type === "spoilage" ? "" : "s"));
          }}
        >
          <ModalForm
            type={modal.type}
            formData={formData}
            setFormData={setFormData}
            CROP_LIST={CROP_LIST}
            EXP_CAT={EXP_CAT}
          />
        </Modal>
      )}
    </div>
  );
}


// ---------- Section Table Component
function SectionTable({ title, columns, rows, field, openModal, deleteSection }) {
  return (
    <div className="section">
      <div className="section-title-row">
        <span>{title}</span>
        <button className="add-btn" onClick={() => openModal(field.slice(0, field.length - 1))}>+ Add</button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>{columns.map(col => <th key={col}>{col}</th>)}
              <th>Edit</th><th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows?.length ? rows.map(r =>
              <tr key={r.id}>
                {Object.keys(r).filter(k => k !== "id").slice(0, columns.length).map((k, i) => <td key={k}>{typeof r[k] === "boolean" ? (r[k] ? "✔" : "") : r[k]}</td>)}
                <td><button className="table-btn edit" onClick={() => openModal(field.slice(0, field.length - 1), r)}>Edit</button></td>
                <td><button className="table-btn del" onClick={() => deleteSection(field, r.id)}>Delete</button></td>
              </tr>
            ) : <tr><td colSpan={columns.length + 2}><em>No records</em></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------- Summary Cards
function SummaryGrid({ record }) {
  const exp = getTotal(record.expenses, "amount");
  const input = getTotal(record.inputs, "cost");
  const revenue = getTotal(record.sales, "amount");
  const yieldAcre = record.outputs.length ? (record.outputs.reduce((t, r) => t + Number(r.actYield), 0) / record.area).toFixed(2) : "–";
  return (
    <div className="summary-grid">
      <div className="summary-card"><span>Total Expenses</span><strong>₹ {exp}</strong></div>
      <div className="summary-card"><span>Total Input Cost</span><strong>₹ {input}</strong></div>
      <div className="summary-card"><span>Total Revenue</span><strong>₹ {revenue}</strong></div>
      <div className="summary-card"><span>Yield/acre</span><strong>{yieldAcre}</strong></div>
      <div className="summary-card"><span>Status</span><strong>{record.status}</strong></div>
    </div>
  );
}

// -------- Modal Component
function Modal({ title, onClose, onSave, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span>{title}</span>
          <button onClick={onClose} className="modal-x">×</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(); }}>{children}
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Modal Form by Type
function ModalForm({ type, formData, setFormData, CROP_LIST, EXP_CAT }) {
  function F(label, key, opts) {
    return (
      <div className="form-group">
        <label>{label}</label>
        {opts ? (
          <select value={formData[key] || ""} onChange={e => setFormData(f => ({ ...f, [key]: e.target.value }))}>
            <option value="">Select...</option>
            {opts.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input type={key === "date" || key === "due" ? "date" : typeof formData[key] === "number" ? "number" : "text"}
            value={formData[key] || ""}
            onChange={e => setFormData(f => ({ ...f, [key]: e.target.value }))}
            min={key === "qty" || key === "cost" || key === "area" ? 0 : undefined}
          />
        )}
      </div>
    );
  }
  if (type === "cycle") {
    return <>
      {F("Crop", "crop", CROP_LIST)}
      {F("Variety", "variety")}
      {F("Area (acre)", "area")}
      {F("Year/Season", "year")}
    </>;
  } else if (type === "input") {
    return <>
      {F("Type", "type", ["Organic Fertilizer", "Medicinal Fertilizer", "Seed", "Pesticide", "Other"])}
      {F("Description", "desc")}
      {F("Quantity", "qty")}
      {F("Unit", "unit")}
      {F("Cost (₹)", "cost")}
      {F("Date", "date")}
    </>;
  } else if (type === "operation") {
    return <>
      {F("Operation", "name")}
      {F("Date", "date")}
      {F("Area (acre)", "area")}
      {F("Cost (₹)", "cost")}
      {F("Notes", "notes")}
    </>;
  } else if (type === "output") {
    return <>
      {F("Date", "date")}
      {F("Expected Yield (qtl)", "expYield")}
      {F("Est. Price", "estPrice")}
      {F("Actual Yield (qtl)", "actYield")}
      {F("Sold (qtl)", "sold")}
      {F("Sold Price", "soldPrice")}
      {F("Revenue (₹)", "revenue")}
    </>;
  } else if (type === "spoilage") {
    return <>
      {F("Date", "date")}
      {F("Qty", "qty")}
      {F("Reason", "reason")}
      {F("Value Loss (₹)", "valueLoss")}
    </>;
  } else if (type === "expense") {
    return <>
      {F("Date", "date")}
      {F("Description", "desc")}
      {F("Category", "cat", EXP_CAT)}
      {F("Amount (₹)", "amount")}
    </>;
  } else if (type === "sale") {
    return <>
      {F("Date", "date")}
      {F("Qty", "qty")}
      {F("Unit", "unit")}
      {F("Price", "price")}
      {F("Amount (₹)", "amount")}
    </>;
  } else if (type === "task") {
    return <>
      {F("Name", "name")}
      {F("Due date", "due")}
      {F("Done", "done", ["true", "false"])}
      {F("Notes", "notes")}
    </>;
  }
  return null;
}

// --- Demo Chart ---
function PieDemo({ data }) {
  // return (
    // <svg width={240} height={200}>
    //   <circle cx={120} cy={100} r={80} fill="#18181b" />
    //   {data.reduce((acc, slice, i) => {
    //     const prev = acc.total || 0;
    //     const pct = slice.value / data.reduce((s, d) => s + d.value, 0);
    //     const [x1, y1] = [120 + 80 * Math.cos(2 * Math.PI * prev), 100 + 80 * Math.sin(2 * Math.PI * prev)];
    //     const [x2, y2] = [120 + 80 * Math.cos(2 * Math.PI * (prev + pct)), 100 + 80 * Math.sin(2 * Math.PI * (prev + pct))];
    //     const large = pct > 0.5 ? 1 : 0;
    //     const d = `M120,100 L${x1},${y1} A80,80 0 ${large} 1 ${x2},${y2} Z`;
    //     return {
    //       ...acc,
    //       total: prev + pct,
    //       arcs: [...(acc.arcs || []), <path key={i} d={d} fill={COLORS[i % COLORS.length]} />]
    //     };
    //   }, { arcs: [], total: 0 }).arcs}
    //   <circle cx={120} cy={100} r={45} fill="#262626" />
    //   {data.map((slice, i) => (
    //     <text key={i}
    //       x={120}
    //       y={40 + 20 * i}
    //       fill={COLORS[i % COLORS.length]}
    //       style={{ fontSize: "0.95em", textShadow: "0 1px 2px #000" }}>
    //       {slice.name}: ₹{slice.value}
    //     </text>
    //   ))}
    // </svg>
  // );
}
