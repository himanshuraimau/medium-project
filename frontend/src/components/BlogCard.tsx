import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id:number
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blogs/${id}`}>
    <div className="p-4 border-b border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer">

        <div className="flex">
            <div className=""> <Avatar name={authorName}  /> </div>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                {authorName}</div>

            <div className="pl-2 flex justify-center flex-col">
                <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                {publishedDate}
            </div>
        </div>

        <div className="font-xl font-semibold pt-2">
            {title}
        </div>
        <div className="font-md font-thin">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 pt-4 font-sm text-sm">
            {`${Math.ceil(content.length / 100)} minute(s) read `}
        </div>


    </div>
    </Link>
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name}: { name: string }) {
    return (
        <div className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-sm font-extralight text-gray-600 dark:text-gray-300">
                {name[0]}
            </span>
        </div>
    );
}
