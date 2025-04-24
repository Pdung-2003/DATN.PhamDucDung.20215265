import React from 'react';
import BlogCard from './BlogCard';

const BlogSection = () => (
    <section className="section">
        <h2 className="section-title">Blog du lịch</h2>
        <div className="section-grid">
            <BlogCard 
                image="https://storage.googleapis.com/a1aa/image/yo1F9JsI3UGJlFxDHLQBczHhhGrUfpfub5GPp0IPJ1w.jpg" 
                title="Blog 1" 
                description="Description of blog 1" 
            />
            <BlogCard 
                image="https://storage.googleapis.com/a1aa/image/yo1F9JsI3UGJlFxDHLQBczHhhGrUfpfub5GPp0IPJ1w.jpg" 
                title="Blog 2" 
                description="Description of blog 2" 
            />
            <BlogCard 
                image="https://storage.googleapis.com/a1aa/image/yo1F9JsI3UGJlFxDHLQBczHhhGrUfpfub5GPp0IPJ1w.jpg" 
                title="Blog 3" 
                description="Description of blog 3" 
            />
        </div>
    </section>
);

export default BlogSection;
