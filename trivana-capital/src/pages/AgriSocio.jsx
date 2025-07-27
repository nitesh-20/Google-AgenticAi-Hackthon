import React, { useState, useRef } from 'react';
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
  const fileInputRef = useRef(null);
  // (removed duplicate)

  // Fake users for DM
  // (removed duplicate)

  // Send DM
  // (removed duplicate)
  const videoInputRef = useRef(null);

  // Fake users for DM
  const fakeUsers = [
    { id: 'u1', name: 'AgriTech India', handle: 'agritech_in', avatar: '/placeholder.svg' },
    { id: 'u2', name: 'Organic Farming', handle: 'organic_farms', avatar: '/placeholder.svg' },
    { id: 'u3', name: 'Farm Equipment', handle: 'farm_equip', avatar: '/placeholder.svg' },
    { id: 'u4', name: 'Priya Agri Solutions', handle: 'priya_agri', avatar: '/placeholder.svg' }
  ];

  const currentUser = {
    id: 'current',
    name: 'Your Farm',
    handle: 'yourfarm',
    avatar: '/placeholder.svg',
    verified: false,
    bio: '🌽 Corn and soybean farmer | Learning sustainable practices',
    location: 'Your Location',
    following: 150,
    followers: 89
  };

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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewImage(file);
      setNewVideo(null);
      setVideoPreview(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setNewVideo(file);
      setNewImage(null);
      setImagePreview(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Send DM
  const handleSendDm = () => {
    if (!dmInput.trim() || !activeChat) return;
    setDmMessages(msgs => ({
      ...msgs,
      [activeChat.id]: [
        ...(msgs[activeChat.id] || []),
        { from: 'me', text: dmInput, time: new Date() }
      ]
    }));
    setDmInput('');
    // Fake reply
    setTimeout(() => {
      setDmMessages(msgs => ({
        ...msgs,
        [activeChat.id]: [
          ...(msgs[activeChat.id] || []),
          { from: 'them', text: 'Thanks for your message!', time: new Date() }
        ]
      }));
    }, 1200);
  };

  const handlePollVote = (postId, optionIndex) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.poll) {
        const updatedPoll = { ...post.poll };
        if (updatedPoll.userVote !== undefined) {
          updatedPoll.options[updatedPoll.userVote].votes--;
          updatedPoll.totalVotes--;
        }
        updatedPoll.options[optionIndex].votes++;
        updatedPoll.totalVotes++;
        updatedPoll.userVote = optionIndex;
        
        return { ...post, poll: updatedPoll };
      }
      return post;
    }));
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const processContent = (content) => {
    return content.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span key={index} className="hashtag">
            {word}{' '}
          </span>
        );
      }
      if (word.startsWith('@')) {
        return (
          <span key={index} className="mention">
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  const PostCard = ({ post }) => {
    const [showAllComments, setShowAllComments] = useState(false);
    const [replyInputs, setReplyInputs] = useState({});
    const handleReply = (commentId, postId) => {
      const text = replyInputs[commentId]?.trim();
      if (!text) return;
      setPosts(posts => posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: (p.comments || []).map(c =>
              c.id === commentId
                ? {
                    ...c,
                    replies: [
                      ...(c.replies || []),
                      {
                        id: Date.now(),
                        user: currentUser,
                        text,
                        timestamp: new Date()
                      }
                    ]
                  }
                : c
            )
          };
        }
        return p;
      }));
      setReplyInputs(inputs => ({ ...inputs, [commentId]: '' }));
    };
    return (
      <div className="post-card">
        <div className="post-header">
          <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
          <div className="post-user-info">
            <span className="post-user-name">{post.user.name} {post.user.verified && <span style={{ color: '#16a34a', fontSize: 16 }}>✓</span>}</span>
            <span className="post-user-handle">@{post.user.handle}</span>
            <span className="post-time">· {formatTime(new Date(post.timestamp))}</span>
          </div>
        </div>
        <div className="post-body">
          <div className="post-content-text">{processContent(post.content)}</div>
          {post.media && post.media.length > 0 && (
            <div className="post-media">
              {post.media.map((m, i) =>
                m.type === 'image' ? (
                  <img key={i} src={m.url} alt={m.alt} className="post-img" />
                ) : (
                  <video key={i} src={m.url} controls className="post-video" />
                )
              )}
            </div>
          )}
          {post.poll && (
            <div className="post-poll">
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Poll:</div>
              {post.poll.options.map((opt, idx) => (
                <div key={idx} style={{ marginBottom: 4 }}>
                  <button
                    style={{
                      background: post.poll.userVote === idx ? '#16a34a' : 'var(--surface)',
                      color: post.poll.userVote === idx ? '#fff' : 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '4px 12px',
                      marginRight: 8,
                      cursor: 'pointer'
                    }}
                    disabled={post.poll.userVote !== undefined}
                    onClick={() => handlePollVote(post.id, idx)}
                  >
                    {opt.text} ({opt.votes})
                  </button>
                </div>
              ))}
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{post.poll.totalVotes} votes · Ends in {formatTime(new Date(post.poll.endsAt))}</div>
            </div>
          )}
        </div>
        <div className="post-actions">
          <button className={`action-btn ${post.liked ? 'liked' : ''}`} onClick={() => handleLike(post.id)}><Heart /> {post.likes}</button>
          <button className="action-btn" onClick={() => setShowComments(c => ({ ...c, [post.id]: !c[post.id] }))}><MessageCircle /> {post.comments ? post.comments.length : 0}</button>
          <button className={`action-btn ${post.reposted ? 'reposted' : ''}`} onClick={() => handleRepost(post.id)}><Repeat2 /> {post.reposts}</button>
          <button className={`action-btn ${post.bookmarked ? 'bookmarked' : ''}`} onClick={() => handleBookmark(post.id)}><Bookmark /></button>
          <button className="action-btn" onClick={() => handleShare(post.id)}><ExternalLink /></button>
        </div>
        {/* Comments Section */}
        {showComments[post.id] && (
          <div className="comments-section">
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment... Use @ to mention"
                value={commentInputs[post.id] || ''}
                onChange={e => setCommentInputs(inputs => ({ ...inputs, [post.id]: e.target.value }))}
                onKeyDown={e => { if (e.key === 'Enter') handleAddComment(post.id); }}
              />
              <button onClick={() => handleAddComment(post.id)} className="submit-btn" style={{ marginLeft: 8 }}>Comment</button>
            </div>
            <div className="comments-list">
              {(post.comments || []).slice(0, showAllComments ? undefined : 2).map((c, idx) => (
                <div key={c.id} className="comment-item">
                  <div className="comment-header">
                    <img src={c.user.avatar} alt={c.user.name} className="comment-avatar" />
                    <span className="comment-user">{c.user.name} {c.user.verified && <span style={{ color: '#16a34a', fontSize: 14 }}>✓</span>}</span>
                    <span className="comment-handle">@{c.user.handle}</span>
                    <span className="comment-time">· {formatTime(new Date(c.timestamp))}</span>
                  </div>
                  <div className="comment-text">{processContent(c.text)}</div>
                  <div className="comment-actions">
                    <button className="reply-btn" onClick={() => setReplyInputs(inputs => ({ ...inputs, [c.id]: '' }))}>Reply</button>
                  </div>
                  {/* Reply input */}
                  <div className="reply-input">
                    <input
                      type="text"
                      placeholder="Reply..."
                      value={replyInputs[c.id] || ''}
                      onChange={e => setReplyInputs(inputs => ({ ...inputs, [c.id]: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') handleReply(c.id, post.id); }}
                    />
                    <button onClick={() => handleReply(c.id, post.id)} className="submit-btn" style={{ marginLeft: 8 }}>Send</button>
                  </div>
                  {/* Replies */}
                  {c.replies && c.replies.length > 0 && (
                    <div className="replies-list">
                      {c.replies.map(r => (
                        <div key={r.id} className="reply-item">
                          <div className="reply-header">
                            <img src={r.user.avatar} alt={r.user.name} className="reply-avatar" />
                            <span className="reply-user">{r.user.name} {r.user.verified && <span style={{ color: '#16a34a', fontSize: 13 }}>✓</span>}</span>
                            <span className="reply-handle">@{r.user.handle}</span>
                            <span className="reply-time">· {formatTime(new Date(r.timestamp))}</span>
                          </div>
                          <div className="reply-text">{processContent(r.text)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {(post.comments || []).length > 2 && !showAllComments && (
                <button className="show-more-btn" onClick={() => setShowAllComments(true)}>Show more comments</button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

// Main return block for AgriSocio component
  return (
    <div className="agrisocio-container">
      <div className="main-layout" style={{ display: 'flex' }}>
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <div className="logo">
            <h1>🌾 AgriSocio</h1>
          </div>
          <nav className="navigation">
            {[
              { icon: Home, label: 'Home', id: 'home' },
              { icon: Search, label: 'Explore', id: 'explore' },
              { icon: Bell, label: 'Notifications', id: 'notifications' },
              { icon: Mail, label: 'Messages', id: 'messages' },
              { icon: Bookmark, label: 'Bookmarks', id: 'bookmarks' },
              { icon: Users, label: 'Communities', id: 'communities' },
              { icon: User, label: 'Profile', id: 'profile' },
              { icon: MoreHorizontal, label: 'More', id: 'more' }
            ].map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="nav-icon" />
                {item.label}
              </button>
            ))}
          </nav>
          <button className="post-button">Post</button>
          <div className="user-section">
            <div 
              className="user-profile"
              onClick={() => setShowProfile(currentUser)}
            >
              <div className="user-avatar">
                <img src={currentUser.avatar} alt={currentUser.name} />
              </div>
              <div className="user-details">
                <p className="user-name">{currentUser.name}</p>
                <p className="user-handle">@{currentUser.handle}</p>
              </div>
              <MoreHorizontal className="more-icon" />
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="main-content">
          <div className="content-wrapper">
            <div className="content-header">
              <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            </div>
            {/* Main Section Switch */}
            {activeTab === 'home' && (
              <>
                {/* Post Composer */}
                <div className="post-composer">
                  <div className="composer-content">
                    <div className="composer-avatar">
                      <img src={currentUser.avatar} alt={currentUser.name} />
                    </div>
                    <div className="composer-main">
                      <textarea
                        placeholder="What's happening on your farm?"
                        className="composer-textarea"
                        rows={3}
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                      />
                      <div className="composer-actions">
                        <div className="media-buttons">
                          <button
                            className="media-btn"
                            type="button"
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                            aria-label="Add Photo"
                          >
                            <Camera className="icon" />
                          </button>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleImageChange}
                          />
                          <button
                            className="media-btn"
                            type="button"
                            onClick={() => videoInputRef.current && videoInputRef.current.click()}
                            aria-label="Add Video"
                          >
                            <Video className="icon" />
                          </button>
                          <input
                            type="file"
                            accept="video/*"
                            style={{ display: 'none' }}
                            ref={videoInputRef}
                            onChange={handleVideoChange}
                          />
                          <button className="media-btn" type="button">
                            <BarChart3 className="icon" />
                          </button>
                          <button className="media-btn" type="button">
                            <Smile className="icon" />
                          </button>
                        </div>
                        {(imagePreview || videoPreview) && (
                          <div className="media-preview" style={{ marginTop: 10 }}>
                            {imagePreview && (
                              <img src={imagePreview} alt="Preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8 }} />
                            )}
                            {videoPreview && (
                              <video src={videoPreview} controls style={{ maxWidth: 160, maxHeight: 120, borderRadius: 8 }} />
                            )}
                            <button
                              type="button"
                              style={{ marginLeft: 10, color: '#f44', background: 'none', border: 'none', cursor: 'pointer' }}
                              onClick={() => { setNewImage(null); setImagePreview(null); setNewVideo(null); setVideoPreview(null); }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                        <button
                          onClick={handlePost}
                          disabled={!newPost.trim() && !imagePreview && !videoPreview}
                          className="submit-btn"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Feed */}
                {shareMsg && (
                  <div style={{ color: '#16a34a', textAlign: 'center', margin: '10px 0', fontWeight: 600 }}>{shareMsg}</div>
                )}
                <div className="feed">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
            {activeTab === 'explore' && (
              <div className="explore-section" style={{ padding: 32 }}>
                <h2>Explore Agriculture</h2>
                <div className="explore-feed">
                  <div className="explore-card">
                    <h3>🌱 New Sustainable Farming Techniques</h3>
                    <p>Discover the latest in crop rotation, organic fertilizers, and water-saving irrigation. #SustainableFarming</p>
                  </div>
                  <div className="explore-card">
                    <h3>🚁 Drone Technology in Fields</h3>
                    <p>How drones are helping farmers monitor crops and fight pests. #DroneAgriculture</p>
                  </div>
                  <div className="explore-card">
                    <h3>🌾 Trending Crop: Millets</h3>
                    <p>Millets are gaining popularity for their resilience and nutrition. #MilletRevolution</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'notifications' && (
              <div className="notifications-section" style={{ padding: 32 }}>
                <h2>Notifications</h2>
                <ul>
                  <li>Priya Agri Solutions liked your post.</li>
                  <li>AgriTech India followed you.</li>
                  <li>Organic Farming commented: "Great tips!"</li>
                  <li>Your poll received 10 new votes.</li>
                </ul>
              </div>
            )}
            {activeTab === 'bookmarks' && (
              <div className="bookmarks-section" style={{ padding: 32 }}>
                <h2>Bookmarked Posts</h2>
                <div className="explore-card">No bookmarks yet. Save posts to see them here!</div>
              </div>
            )}
            {activeTab === 'communities' && (
              <div className="communities-section" style={{ padding: 32 }}>
                <h2>Communities</h2>
                <div className="explore-card">Join communities to connect with other farmers and agri-experts!</div>
                <ul>
                  <li>#OrganicFarming</li>
                  <li>#WheatHarvest</li>
                  <li>#DroneAgriculture</li>
                  <li>#MarketUpdates</li>
                </ul>
              </div>
            )}
            {activeTab === 'profile' && (
              <div className="profile-section" style={{ padding: 32 }}>
                <h2>Your Profile</h2>
                <div className="explore-card">
                  <strong>{currentUser.name}</strong> <span>@{currentUser.handle}</span>
                  <p>{currentUser.bio}</p>
                  <p>Location: {currentUser.location}</p>
                  <p>Followers: {currentUser.followers} | Following: {currentUser.following}</p>
                </div>
              </div>
            )}
            {activeTab === 'messages' && (
              <div className="dm-section" style={{ display: 'flex', height: '70vh', background: 'var(--surface)', borderRadius: 12, overflow: 'hidden', margin: 24 }}>
                <div style={{ width: 220, borderRight: '1px solid var(--border)', background: 'var(--background)', padding: 12 }}>
                  <h3 style={{ margin: '8px 0 12px 0', color: 'var(--primary-color)' }}>Chats</h3>
                  {fakeUsers.map(u => (
                    <div
                      key={u.id}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, borderRadius: 8, cursor: 'pointer', background: activeChat?.id === u.id ? 'var(--surface)' : 'none', fontWeight: activeChat?.id === u.id ? 600 : 400 }}
                      onClick={() => setActiveChat(u)}
                    >
                      <img src={u.avatar} alt={u.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                      <div>
                        <div>{u.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>@{u.handle}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
                  {activeChat ? (
                    <>
                      <div style={{ padding: 12, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={activeChat.avatar} alt={activeChat.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{activeChat.name}</div>
                          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>@{activeChat.handle}</div>
                        </div>
                      </div>
                      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {(dmMessages[activeChat.id] || []).map((msg, i) => (
                          <div key={i} style={{ alignSelf: msg.from === 'me' ? 'flex-end' : 'flex-start', background: msg.from === 'me' ? 'var(--primary-color)' : 'var(--surface)', color: msg.from === 'me' ? '#fff' : 'var(--text-primary)', borderRadius: 12, padding: '7px 14px', maxWidth: 260 }}>
                            {msg.text}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid var(--border)' }}>
                        <input
                          type="text"
                          value={dmInput}
                          onChange={e => setDmInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') handleSendDm(); }}
                          placeholder={`Message @${activeChat.handle}`}
                          style={{ flex: 1, borderRadius: 8, border: '1px solid var(--border)', padding: 8, fontSize: 15 }}
                        />
                        <button onClick={handleSendDm} className="submit-btn" style={{ padding: '6px 18px', fontSize: 15 }}>Send</button>
                      </div>
                    </>
                  ) : (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 60 }}>Select a chat to start messaging</div>
                  )}
                </div>
              </div>
            )}
            {/* Add more tab content here for explore, notifications, bookmarks, etc. */}
          </div>
        </div>
        {/* Right Sidebar: What's happening & Who to follow */}
        <div className="right-sidebar" style={{ width: 340, background: 'var(--background)', padding: 24, borderLeft: '1px solid var(--border)', minHeight: '100vh' }}>
          <div style={{ marginBottom: 32 }}>
            <input type="text" placeholder="Search AgriSocio" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)' }} />
          </div>
          <div className="trending-section" style={{ marginBottom: 32 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12 }}>What's happening</h3>
            {trendingTopics.map((topic, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Trending in Agriculture</div>
                <div style={{ fontWeight: 600 }}>{topic.tag}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{topic.posts} Posts</div>
              </div>
            ))}
          </div>
          <div className="who-to-follow-section">
            <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Who to follow</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>A</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>AgriTech India <span style={{ color: '#16a34a', fontSize: 16 }}>✓</span></div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>@agritech_in</div>
                </div>
                <button style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>Follow</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>O</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>Organic Farming</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>@organic_farms</div>
                </div>
                <button style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>Follow</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>F</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>Farm Equipment</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>@farm_equip</div>
                </div>
                <button style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal user={showProfile} onClose={() => setShowProfile(null)} />
      )}
    </div>
  );
};

export default AgriSocio;