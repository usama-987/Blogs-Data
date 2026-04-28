// Import React and the necessary hooks
import React, { useState, useEffect } from "react";

// Import blog data from a separate JS file
import blogPosts from "./component/data"; // blogPosts is an array of objects with title, content, etc.

export default function App() {
  // State to hold all posts
  const [posts, setPosts] = useState([]); // Initially empty array

  // State to hold the search query
  const [search, setSearch] = useState(""); // Initially empty string

  // State to hold filtered posts based on search
  const [filteredPosts, setFilteredPosts] = useState([]); // Initially empty array

  // State for the contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // useEffect runs after the component mounts
  useEffect(() => {
    // Load the blog posts into state
    setPosts(blogPosts); // store all posts
    setFilteredPosts(blogPosts); // initially, filtered posts = all posts
  }, []); // empty dependency array means it runs only once on mount

  // useEffect runs whenever 'search' or 'posts' changes
  useEffect(() => {
    // Filter posts based on search query
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) || // search in title
      post.content.toLowerCase().includes(search.toLowerCase()) // search in content
    );
    setFilteredPosts(filtered); // update filtered posts state
  }, [search, posts]); // dependencies: if search or posts change, re-run

  // Function to handle contact form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default page reload on form submit
    // Display alert with user's name
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-6">
      {/* Main container */}
      <header className="text-center mb-10">
        {/* Header section */}
        <h1 className="text-4xl font-bold mb-2">My Blog</h1>
        {/* Blog title */}
        <p className="text-gray-600">React + Tailwind fully dynamic blog</p>
        {/* Subtitle */}
      </header>

      {/* Search Input */}
      <div className="mb-10 text-center">
        <input
          type="text"
          placeholder="Search posts..."
          className="p-2 border rounded w-1/2"
          value={search} // Bind input value to search state
          onChange={(e) => setSearch(e.target.value)} // Update search state on typing
        />
      </div>

      {/* Blog Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Responsive grid: 2 columns on medium screens, 3 on large */}
        {filteredPosts.map(post => (
          // Map over filtered posts and render a card for each
          <div key={post.id} className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col">
            {/* Blog card */}
            <img src={post.image} alt={post.title} className="rounded mb-4" />
            {/* Blog image */}
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            {/* Blog title */}
            <p className="text-gray-500 text-sm mb-2">By {post.author} | {post.date}</p>
            {/* Author and date */}
            <p className="mb-4 flex-1">{post.content}</p>
            {/* Blog content */}
            <div className="mb-2">
              {/* Tags */}
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2">{tag}</span>
              ))}
            </div>
            <a
              href="#"
              className="mt-auto text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-center"
            >
              Read More
            </a>
            {/* Read more button (could link to another page or modal) */}
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="mt-20 max-w-md mx-auto bg-white p-6 rounded shadow">
        {/* Centered form container */}
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        {/* Form title */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form element */}
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded"
            value={formData.name} // Bind input to state
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Update name
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email} // Bind input to state
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Update email
            required
          />
          <textarea
            placeholder="Message"
            className="w-full p-2 border rounded"
            value={formData.message} // Bind textarea to state
            onChange={(e) => setFormData({ ...formData, message: e.target.value })} // Update message
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}