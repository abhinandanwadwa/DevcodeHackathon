const express = require('express');
const router = express.Router();
const UserSchema = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
const ProjectSchema = require('../models/Project');
const fetchuser = require('../middleware/fetchuser');
const pool = require('../pgdb');
// const { default: Projects } = require('../../frontend/src/components/Projects/Projects');
// const fetchuser = require('../middleware/fetchuser');
const dotenv = require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;




// Route 1: Liking a project: POST: http://localhost:8181/api/project/likeproject. Login Required
router.post('/likeproject', fetchuser, [
    body('projectId', "Please enter a valid project id").isLength({ min: 1 }),
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        // const theProject = await ProjectSchema.findById(req.body.projectId);
        const theProject = await pool.query("SELECT * FROM projects WHERE id = $1", [
            req.body.projectId
        ]);
        let newLikesArray = theProject.rows[0].likedby;
        let newNewArray = [];
        if (!newLikesArray.includes(req.user.id.toString())) {
            newLikesArray.push(req.user.id);
            // const updateProject = await ProjectSchema.findByIdAndUpdate(req.body.projectId, { likedBy: newLikesArray });
            const updateProject = await pool.query("UPDATE projects SET likedby = $1 WHERE id = $2",[
                newLikesArray,
                req.body.projectId
            ]);
        }
        else {
            newNewArray = newLikesArray.filter((personId) => personId !== req.user.id.toString());
            // const updateProject = await ProjectSchema.findByIdAndUpdate(req.body.projectId, { likedBy: newNewArray });
            const updateProject = await pool.query("UPDATE projects SET likedby = $1 WHERE id = $2",[
                newNewArray,
                req.body.projectId
            ]);
        }

        res.json("Success!!");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


module.exports = router;