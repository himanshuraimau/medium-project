import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBody } from "../components/FullBody";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
    const {id}  = useParams();
    const { loading, blog } = useBlog({
        id: id || "1"
    });

    return (
        <div>
            {loading ? (
                <div className="flex flex-row">
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                </div>
            ) : blog ? (
                <FullBody key={blog.id}
                blog={blog} />
            ) : (
                <p>Blog not found</p>
            )}
        </div>
    );

};
