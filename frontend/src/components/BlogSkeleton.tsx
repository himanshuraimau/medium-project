export const BlogSkeleton = ()=>{
    return  <div>
            
<div role="status" className="max-w-sm animate-pulse">
<div className="p-4 border-b border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer">
    <div className="flex items-center">
        <div>
            {/* Skeleton for Avatar */}
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {/* Skeleton for Author Name */}
            <div className="h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="pl-2 flex justify-center flex-col">
            {/* Skeleton for Circle */}
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {/* Skeleton for Published Date */}
            <div className="h-3 bg-gray-200 rounded"></div>
        </div>
    </div>

    <div className="font-xl font-semibold pt-2">
        {/* Skeleton for Title */}
        <div className="h-8 bg-gray-200 rounded"></div>
    </div>
    <div className="font-md font-thin">
        {/* Skeleton for Content */}
        <div className="h-5 bg-gray-200 rounded"></div>
    </div>
    <div className="text-slate-500 pt-4 font-sm text-sm">
        {/* Skeleton for Read Time */}
        <div className="h-3 bg-gray-200 rounded"></div>
    </div>
</div>

</div>


    </div>
}