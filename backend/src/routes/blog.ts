import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@eng_himanshu/medium";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use(async (c, next) => {
    const authHeader = c.req.header('Authorization');
	
	try{
		const user  = await verify(authHeader ||"",c.env.JWT_SECRET);
		if(user){
		c.set("userId",user.id)
		await next()
	}
	else{
		c.status(403);
		return c.json({
			message:"You are not logged in"
		})
	}} catch(e){
		c.status(403);
		return c.json({
			message:"You are not logged in"
		})
	}

});

blogRouter.post('/', async (c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
	const userId = c.get('userId');
	const post = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: Number(userId)
		}
	});
	return c.json({
		id: post.id
	});
})

blogRouter.put('/', async (c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
	const userId = c.get('userId');
	prisma.blog.update({
		where: {
			id: body.id,
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

blogRouter.get('/bulk',async (c)=>{

    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	const blogs = await prisma.blog.findMany({
		select:{
			content:true,
			title:true,
			id:true,
			author:{
				select:{
					name:true
				}
			}
		}
	});
   
	return c.json({
		blogs
	})


})

blogRouter.get('/:id', async (c) => {
    try {
        const blogId = parseInt(c.req.param("id"));
        
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	
        }).$extends(withAccelerate());
        
        const blog = await prisma.blog.findFirst({
            where: {
                id: blogId
            },
            select:{
                id: true,
                content: true,
                title: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        return c.json(blog);
    } catch (e) {
        console.error("Error fetching blog post:", e);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});

