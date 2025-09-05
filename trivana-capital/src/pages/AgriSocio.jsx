import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Bookmark, 
  MoreHorizontal,
  Search,
  Bell,
  Mail,
  Users,
  Home,
  User,
  Settings,
  TrendingUp,
  Camera,
  Video,
  Smile,
  MapPin,
  Calendar,
  ExternalLink,
  X,
  Plus,
  BarChart3
} from 'lucide-react';
import '../styles/AgriSocio.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AgriSocio = () => {
  // Home feed posts (restored original content)
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: {
        id: '1',
        name: 'Rajesh Kumar',
        handle: 'rajesh_farms',
        avatar: '/placeholder.svg',
        verified: true,
        bio: '🌾 Wheat farmer from Punjab | Sustainable agriculture advocate | Father of 2',
        location: 'Punjab, India',
        following: 245,
        followers: 1200
      },
      content: 'Great wheat harvest this season! 🌾 Thanks to the new irrigation system and organic fertilizers. Yield increased by 30% compared to last year. #WheatHarvest #SustainableFarming #Punjab',
      media: [
        { type: 'image', url: '/placeholder.svg', alt: 'Wheat field harvest' },
        { type: 'image', url: '/placeholder.svg', alt: 'Wheat grains close-up' }
      ],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 45,
      replies: 12,
      reposts: 8,
      bookmarked: false,
      liked: false,
      reposted: false,
      pinned: true,
      comments: [
        {
          id: 101,
          user: {
            id: '2',
            name: 'Priya Agri Solutions',
            handle: 'priya_agri',
            avatar: '/placeholder.svg',
            verified: true
          },
          text: 'Congratulations! Which fertilizer did you use?',
          timestamp: new Date(Date.now() - 90 * 60 * 1000),
          replies: [
            {
              id: 201,
              user: {
                id: '1',
                name: 'Rajesh Kumar',
                handle: 'rajesh_farms',
                avatar: '/placeholder.svg',
                verified: true
              },
              text: 'Thank you! Used organic compost and neem-based pesticide.',
              timestamp: new Date(Date.now() - 80 * 60 * 1000)
            }
          ]
        },
        {
          id: 102,
          user: {
            id: '3',
            name: 'Farmer Connect',
            handle: 'farmer_connect',
            avatar: '/placeholder.svg',
            verified: false
          },
          text: 'Can you share your irrigation setup details? #Irrigation',
          timestamp: new Date(Date.now() - 70 * 60 * 1000),
          replies: []
        }
      ]
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Priya Agri Solutions',
        handle: 'priya_agri',
        avatar: '/placeholder.svg',
        verified: true,
        bio: '🚜 Agricultural technology | Drone services | Precision farming',
        location: 'Maharashtra, India',
        following: 890,
        followers: 5400
      },
      content: 'New drone survey of cotton fields completed! 🚁 Detected early signs of pest infestation in sector 7. Early intervention can save 15-20% of crop. Technology saving farmers! #DroneAgriculture #PrecisionFarming #CottonFarming',
      media: [
        { type: 'video', url: '/placeholder.svg', alt: 'Drone footage of cotton fields' }
      ],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 89,
      replies: 23,
      reposts: 34,
      bookmarked: true,
      liked: true,
      reposted: false,
      comments: [
        {
          id: 103,
          user: {
            id: '1',
            name: 'Rajesh Kumar',
            handle: 'rajesh_farms',
            avatar: '/placeholder.svg',
            verified: true
          },
          text: 'Impressive! How do you analyze the drone data?',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          replies: []
        }
      ]
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Farmer Connect',
        handle: 'farmer_connect',
        avatar: '/placeholder.svg',
        verified: false,
        bio: '🌱 Connecting farmers worldwide | Market prices | Weather updates',
        following: 1200,
        followers: 3400
      },
      content: 'Poll: What\'s your biggest challenge in farming this season?',
      poll: {
        id: 'poll1',
        options: [
          { text: 'Water shortage', votes: 45 },
          { text: 'Pest control', votes: 32 },
          { text: 'Market prices', votes: 67 },
          { text: 'Labor shortage', votes: 23 }
        ],
        totalVotes: 167,
        endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        userVote: 2
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 34,
      replies: 56,
      reposts: 12,
      bookmarked: false,
      liked: false,
      reposted: false,
      comments: []
    },
    // Extra fake posts for demo
    {
      id: '4',
      user: {
        id: '4',
        name: 'Organic Farming',
        handle: 'organic_farms',
        avatar: '/placeholder.svg',
        verified: false
      },
      content: 'Tried crop rotation with legumes this year. Soil health improved a lot! #CropRotation #SoilHealth',
      media: [
        { type: 'image', url: '/placeholder.svg', alt: 'Legume crop' }
      ],
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 12,
      replies: 2,
      reposts: 1,
      bookmarked: false,
      liked: false,
      reposted: false,
      comments: [
        {
          id: 104,
          user: {
            id: '1',
            name: 'Rajesh Kumar',
            handle: 'rajesh_farms',
            avatar: '/placeholder.svg',
            verified: true
          },
          text: 'Great! Which legume did you use? @organic_farms',
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
          replies: []
        }
      ]
    },
    {
      id: '5',
      user: {
        id: '5',
        name: 'AgriTech India',
        handle: 'agritech_in',
        avatar: '/placeholder.svg',
        verified: true
      },
      content: 'Launching new weather prediction tool for farmers! Try it now and get real-time updates. #WeatherAI',
      media: [],
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      likes: 22,
      replies: 3,
      reposts: 2,
      bookmarked: false,
      liked: false,
      reposted: false,
      comments: [
        {
          id: 105,
          user: {
            id: '3',
            name: 'Farmer Connect',
            handle: 'farmer_connect',
            avatar: '/placeholder.svg',
            verified: false
          },
          text: 'Is it available for all regions?',
          timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
          replies: []
        }
      ]
    }
  ]);

  // Pre-populated DM messages for fake users
  const [dmMessages, setDmMessages] = useState({
    u1: [
      { from: 'them', text: 'Welcome to AgriSocio! How can we help you today?', time: new Date(Date.now() - 60 * 60 * 1000) },
      { from: 'me', text: 'Hi! I want to know about your latest drone services.', time: new Date(Date.now() - 58 * 60 * 1000) },
      { from: 'them', text: 'Sure! We offer crop monitoring, pest detection, and more.', time: new Date(Date.now() - 57 * 60 * 1000) }
    ],
    u2: [
      { from: 'them', text: 'Organic farming tips: Rotate crops and use compost!', time: new Date(Date.now() - 2 * 60 * 60 * 1000) }
    ],
    u3: [
      { from: 'them', text: 'Need new equipment? Check our latest catalogue.', time: new Date(Date.now() - 3 * 60 * 60 * 1000) }
    ],
    u4: [
      { from: 'them', text: 'Priya Agri Solutions here! Ask us anything.', time: new Date(Date.now() - 4 * 60 * 60 * 1000) }
    ]
  });

  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newVideo, setNewVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [showProfile, setShowProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [activeChat, setActiveChat] = useState(null);
  const [dmInput, setDmInput] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});
  const [shareMsg, setShareMsg] = useState('');
  const [currentUser, setCurrentUser] = useState({
    id: 'current',
    name: 'Your Farm',
    handle: 'yourfarm',
    avatar: '/placeholder.svg',
    verified: false,
    bio: '🌽 Corn and soybean farmer | Learning sustainable practices',
    location: 'Your Location',
    following: 150,
    followers: 89
  });

  // Profile edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editHandle, setEditHandle] = useState(currentUser.handle);
  const [editAvatarPreview, setEditAvatarPreview] = useState(currentUser.avatar);
  const editFileRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Populate currentUser from Firebase auth when available
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser((prev) => ({
          ...prev,
          id: user.uid || prev.id,
          name: user.displayName || prev.name,
          handle: (user.email && user.email.split('@')[0]) || prev.handle,
          avatar: user.photoURL || prev.avatar
        }));
      }
    });
    return () => unsub();
  }, []);

  // open edit modal and initialize fields
  const openEditProfile = () => {
    setEditName(currentUser.name || '');
    setEditHandle(currentUser.handle || '');
    setEditAvatarPreview(currentUser.avatar || '/placeholder.svg');
    setEditOpen(true);
  };

  const handleAvatarPick = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setEditAvatarPreview(url);
  };

  const saveProfile = () => {
    setCurrentUser((prev) => ({ ...prev, name: editName, handle: editHandle, avatar: editAvatarPreview }));
    setEditOpen(false);
  };

  const fakeUsers = [
    { id: 'u1', name: 'AgriTech India', handle: 'agritech_in', avatar: '/placeholder.svg' },
    { id: 'u2', name: 'Organic Farming', handle: 'organic_farms', avatar: '/placeholder.svg' },
    { id: 'u3', name: 'Farm Equipment', handle: 'farm_equip', avatar: '/placeholder.svg' },
    { id: 'u4', name: 'Priya Agri Solutions', handle: 'priya_agri', avatar: '/placeholder.svg' }
  ];

  const trendingTopics = [
    { tag: '#WheatHarvest', posts: '12.5K' },
    { tag: '#SustainableFarming', posts: '8.9K' },
    { tag: '#DroneAgriculture', posts: '5.2K' },
    { tag: '#OrganicFarming', posts: '15.1K' },
    { tag: '#CropRotation', posts: '3.8K' }
  ];

  const handleLike = (postId) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const liked = !post.liked;
        const likes = liked ? post.likes + 1 : post.likes - 1;
        return { ...post, liked, likes };
      }
      return post;
    }));
  };

  const handleRepost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            reposted: !post.reposted, 
            reposts: post.reposted ? post.reposts - 1 : post.reposts + 1 
          }
        : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  // Add comment to a post
  const handleAddComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    setPosts(posts => posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...(post.comments || []),
              {
                id: Date.now(),
                user: currentUser,
                text,
                timestamp: new Date()
              }
            ]
          }
        : post
    ));
    setCommentInputs(inputs => ({ ...inputs, [postId]: '' }));
  };

  // Share post (copy link)
  const handleShare = (postId) => {
    const url = window.location.origin + '/agrisocio/post/' + postId;
    navigator.clipboard.writeText(url);
    setShareMsg('Link copied!');
    setTimeout(() => setShareMsg(''), 1500);
  };

  const handlePost = () => {
    if (newPost.trim() || newImage || newVideo) {
      const mediaArr = [];
      if (newImage) mediaArr.push({ type: 'image', url: imagePreview, alt: 'User uploaded' });
      if (newVideo) mediaArr.push({ type: 'video', url: videoPreview, alt: 'User uploaded video' });
      const post = {
        id: String(Date.now()),
        user: currentUser,
        content: newPost,
        timestamp: new Date(),
        likes: 0,
        replies: 0,
        reposts: 0,
        bookmarked: false,
        liked: false,
        reposted: false,
        media: mediaArr
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setNewImage(null);
      setImagePreview(null);
      setNewVideo(null);
      setVideoPreview(null);
    }
  }

  return (
    <div className="main-area container-wide agrisocio-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">AgriSocio</h2>
          <div className="page-subtitle">Community for farmers — share updates, ask questions, get advice</div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div className="search-box">
            <input className="search-input" placeholder="Search posts, topics or people" />
          </div>
          <div className="profile-quick card" style={{display:'flex',alignItems:'center',gap:10,padding:'6px 10px'}}>
            <img src={currentUser.avatar} alt="me" style={{width:36,height:36,borderRadius:8}} />
            <div style={{display:'flex',flexDirection:'column'}}>
              <strong style={{fontSize:13}}>{currentUser.name}</strong>
              <small style={{color:'var(--muted)'}}>@{currentUser.handle}</small>
            </div>
            <button className="btn btn-ghost" style={{marginLeft:8}} onClick={openEditProfile} title="Edit profile">Edit</button>
          </div>
        </div>
      </div>

      <div className="main-layout">
        <div className="feed" style={{flex:1}}>

          {/* Composer card */}
          <div className="card post-creator" style={{marginBottom:16}}>
            <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
              <img src={currentUser.avatar} alt="avatar" style={{width:48,height:48,borderRadius:8}} />
              <div style={{flex:1}}>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder={`What's happening on your farm, ${currentUser.name.split(' ')[0]}?`}
                  style={{width:'100%',borderRadius:10,border:'1px solid rgba(15,23,42,0.06)',padding:12,minHeight:72}}
                />
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                  <div style={{display:'flex',gap:8}}>
                    <button className="btn btn-ghost" onClick={() => fileInputRef.current && fileInputRef.current.click()}>Attach Image</button>
                    <input ref={fileInputRef} type="file" accept="image/*" style={{display:'none'}} onChange={(e)=>{ setNewImage(e.target.files[0]); setImagePreview(URL.createObjectURL(e.target.files[0])); }} />
                    <button className="btn btn-ghost" onClick={() => videoInputRef.current && videoInputRef.current.click()}>Attach Video</button>
                    <input ref={videoInputRef} type="file" accept="video/*" style={{display:'none'}} onChange={(e)=>{ setNewVideo(e.target.files[0]); setVideoPreview(URL.createObjectURL(e.target.files[0])); }} />
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={handlePost}>Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts feed */}
          {posts.map((post) => (
            <article key={post.id} className="card post-card" style={{marginBottom:14}}>
              <div style={{display:'flex',gap:12}}>
                <img src={post.user.avatar} alt="avatar" style={{width:52,height:52,borderRadius:10}} />
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <strong style={{fontSize:15}}>{post.user.name} {post.user.verified && <span style={{color: 'var(--primary)', marginLeft:6}}>✓</span>}</strong>
                      <div style={{color:'var(--muted)',fontSize:12}}>@{post.user.handle} · {new Date(post.timestamp).toLocaleString()}</div>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <button className="icon-btn" title="More"><MoreHorizontal size={18} /></button>
                    </div>
                  </div>

                  <div style={{marginTop:10,marginBottom:10,color:'var(--text)'}}>{post.content}</div>

                  {post.media && post.media.length > 0 && (
                    <div className="post-media" style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      {post.media.map((m, i) => (
                        m.type === 'image' ? <img key={i} src={m.url} alt={m.alt} style={{width:220,height:'auto',borderRadius:10}} /> : <video key={i} src={m.url} style={{width:300,borderRadius:10}} controls />
                      ))}
                    </div>
                  )}

                  <div style={{display:'flex',gap:12,marginTop:12,alignItems:'center'}}>
                    <button className="icon-btn" onClick={() => handleLike(post.id)}><Heart size={18} /> <span style={{marginLeft:6}}>{post.likes}</span></button>
                    <button className="icon-btn" onClick={() => handleRepost(post.id)}><Repeat2 size={18} /> <span style={{marginLeft:6}}>{post.reposts}</span></button>
                    <button className="icon-btn" onClick={() => handleBookmark(post.id)}><Bookmark size={18} /></button>
                    <button className="icon-btn" onClick={() => handleShare(post.id)}><ExternalLink size={16} /></button>
                    <div style={{marginLeft:'auto',color:'var(--muted)',fontSize:13}}>{post.replies} replies</div>
                  </div>
                </div>
              </div>
            </article>
          ))}

        </div>

        <aside className="sidebar" style={{width:320,marginLeft:20}}>
          <div className="card" style={{padding:12,marginBottom:12}}>
            <h4 style={{margin:0}}>Trending Topics</h4>
            <ul style={{listStyle:'none',padding:0,marginTop:8,display:'flex',flexDirection:'column',gap:8}}>
              {trendingTopics.map((t) => (
                <li key={t.tag} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <a href="#" style={{color:'var(--primary)',fontWeight:700}}>{t.tag}</a>
                  <small style={{color:'var(--muted)'}}>{t.posts}</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="card" style={{padding:12}}>
            <h4 style={{margin:0}}>Suggested Accounts</h4>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
              {fakeUsers.map((u) => (
                <div key={u.id} style={{display:'flex',gap:10,alignItems:'center'}}>
                  <img src={u.avatar} alt={u.name} style={{width:44,height:44,borderRadius:8}} />
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700}}>{u.name}</div>
                    <div style={{color:'var(--muted)',fontSize:13}}>@{u.handle}</div>
                  </div>
                  <button className="btn btn-ghost">Follow</button>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>

      {/* Profile Edit Modal (local only) */}
      {editOpen && (
        <div className="modal-backdrop" style={{position:'fixed',left:0,top:0,right:0,bottom:0,background:'rgba(2,6,23,0.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}}>
          <div className="card" style={{width:480,maxWidth:'92%',padding:18}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <h3 style={{margin:0}}>Edit Profile</h3>
              <button className="btn btn-ghost" onClick={()=>setEditOpen(false)}><X size={16} /></button>
            </div>
            <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
              <img src={editAvatarPreview} alt="avatar" style={{width:64,height:64,borderRadius:10,objectFit:'cover',border:'1px solid rgba(9,20,25,0.04)'}} />
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                <input ref={editFileRef} type="file" accept="image/*" style={{display:'none'}} onChange={handleAvatarPick} />
                <div style={{display:'flex',gap:8}}>
                  <button className="btn btn-ghost" onClick={() => editFileRef.current && editFileRef.current.click()}><Camera size={14} /> Change</button>
                  <button className="btn btn-ghost" onClick={() => setEditAvatarPreview('/placeholder.svg')}>Reset</button>
                </div>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontSize:13,color:'var(--text-muted)'}}>Name</label>
              <input value={editName} onChange={(e)=>setEditName(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid rgba(9,20,25,0.06)'}} />
              <label style={{fontSize:13,color:'var(--text-muted)'}}>Handle</label>
              <input value={editHandle} onChange={(e)=>setEditHandle(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid rgba(9,20,25,0.06)'}} />
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:12}}>
              <button className="btn btn-ghost" onClick={()=>setEditOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveProfile}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriSocio;