import Employee from "../models/Employee.js";


//get profile
//GET /api/profile


export const getProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId })

    if (!employee) {
      //authenticated user is not an employee - return admin profile
      return res.json({
        firstName: "Admin",
        lastName: "",
        email: session.email

      })

    }
    return res.json(employee)

  } catch (error) {
    return res.status(500).json({ error: "failed to fetch" })

  }
}

//update password
// PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId })

    if (!employee) {
      return res.status(404).json({error: "EMployee not found"})
    }
    if(employee.isDeleted){
      return res.status(403).json({error: "your account is deactivated. you canot update"})
    }
    await Employee.findByIdAndUpdate(employee._id,{bio:req.body.bio})
    return res.json({success: true})

  } catch (error) {
    return res.status(500).json({ error: "failed to update profile" })

  }
}
