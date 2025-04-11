import jwt from "jsonwebtoken";

const Authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        console.log(token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({
            message: "Internal Server Error",
            error: error.message,  

        });
    }
}

export default  Authorization;