const express = require("express")
const cors = require("cors")
const connectDb = require("./mongo")
const Users = require("./Models/Users")
const app = express()

connectDb()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: "*"
}))


app.post("/", async (req, res) => {
    const { email, password } = req.body

    try {
        const check = await Users.findOne({ email: email })

        if (check && check.password === password) {
            res.status(200).json({
                exits: true,
                data: check
            })
        }
        else {
            res.status(400).json("notexist")
        }
    }
    catch (e) {
        console.log(e.message);
    }


})

app.post("/signup", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    console.log(req.body)
    const data = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }

    try {
        const check = await Users.findOne({ email: email })
        if (check) {
            res.json("exist")
        }
        else {

            await Users.create(data)
            res.json("SUCCESS")
        }
    }
    catch (e) {
        res.send("notexist")
        console.log(e)
    }


})

app.get("/home/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/signup/:id", async (req, res) => {
    const { id } = req.params;
    const { name, age, gender, mobileNumber, dateOfBirth } = req.body;

    try {

        const updatedUser = await Users.findByIdAndUpdate(id, {
            name,
            age,
            gender,
            mobileNumber,
            dateOfBirth,
        }, { new: true });

        if (updatedUser) {
            res.json({ message: "Profile updated successfully", updatedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(8000, () => {
    console.log("port connected");
})

