import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        blogs.map(blog => (
                            <BlogCard
                                id={blog.id} 
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={"2 FEB 2024"} 
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
