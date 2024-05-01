import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBody } from "../components/FullBody";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading) {
        return (
            <div className="flex justify-center pt-50% pl-50%">
                <BlogSkeleton />
            </div>
        );
    }

    if (!blog) {
        return <p>Blog not found</p>;
    }

    return <FullBody blog={blog} />;
};
