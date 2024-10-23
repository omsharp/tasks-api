import createApp from "@/lib/create-app.js";

const app = createApp();

app.get('/', (c) => {
    return c.text('Hello, Hono!');
});

app.get("/error", (c) => {
    c.var.logger.info("this is an error log")
    throw new Error("On Noooo!");
})

export default app;