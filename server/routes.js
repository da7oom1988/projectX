const express = require('express')

const db = require('./dbConfig')

const router = express.Router()


//test server connection
router.get('/test', (req, res) => res.status(200).send())


router.post('/user/signup', (req, res) => {
    if (!req.body.uid || !req.body.name || !req.body.email) {
        return res.status(406).json({
            message: "Please complete all require fields"
        })
    }

    db.execute('INSERT INTO users (uid, name, email) VALUES(?,?,?);', [req.body.uid, req.body.name, !req.body.email], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: err
            })
        }
        console.log(result)
        return res.status(200).json({
            message: 'success'
        })
    })
})



router.post('/project/add', (req, res) => {
    const { projectName, projectDescription, dueDate, estCost, uid } = req.body;
    if (!projectName || !estCost || !uid) return res.status(406).json({
        message: "Please complete all require fields"
    })

    db.execute('INSERT INTO projects (uid, project_name, project_description, est_cost, due_date) VALUES(?,?,?,?,?);', [uid, projectName, projectDescription, estCost, dueDate], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json({
            message: 'success'
        })
    })
})


//edit project
router.put('/project/edit/:id', (req, res) => {
    const { id } = req.params
    const { projectName, projectDescription, dueDate, estCost } = req.body;
    if (!projectName || !estCost) return res.status(406).json({
        message: "Please complete all require fields"
    })

    db.execute('UPDATE projects SET project_name=?, project_description=?, est_cost=?, due_date=? WHERE id=?;', [projectName, projectDescription, estCost, dueDate, id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json({
            message: 'success'
        })
    })
})

//add task
router.post('/task/add', (req, res) => {
    const { projectId, taskName, taskDescription, cost } = req.body;
    if (!projectId || !taskName || !cost) return res.status(406).json({
        message: "Please complete all require fields"
    })

    db.execute('INSERT INTO tasks (project_id, task_name, task_description, cost) VALUES(?,?,?,?);', [projectId, taskName, taskDescription, cost], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json({
            message: 'success'
        })
    })
})

//delete project
router.delete('/project/delete/:id', (req, res) => {
    const { id } = req.params

    db.execute('DELETE FROM projects WHERE id=?;', [id], (err) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json({
            message: 'success'
        })
    })
})


//delete task
router.delete('/task/delete/:id', (req, res) => {
    const { id } = req.params

    db.execute('DELETE FROM tasks WHERE id=?;', [id], (err) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json({
            message: 'success'
        })
    })
})

//done task
router.put('/task/done/:id', (req, res) => {
    const { id } = req.params

    db.execute('UPDATE tasks SET done=1 WHERE id=?;', [id], (err) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json({
            message: 'success'
        })
    })
})

//all project by one user
router.get('/projects/:uid', (req, res) => {
    const uid = req.params.uid;

    db.execute('SELECT * FROM projects WHERE uid=? ORDER BY created_at DESC;', [uid], (err, row) => {
        if (err) return res.status(500).json({
            message: err
        })

        if (row.length < 1) return res.status(200).json([])

        return res.status(200).json(row)
    })
})

//project by id
router.get('/project/:id', (req, res) => {
    const id = req.params.id;

    db.execute('SELECT * FROM projects WHERE id=?;', [id], (err, row) => {
        if (err) return res.status(500).json({
            message: err
        })

        if (row.length < 1) return res.status(404).json({
            message: 'there is no projects'
        })

        db.execute('SELECT * FROM tasks WHERE project_id=?;', [id], (err, tasksRows) => {
            if (err) return res.status(500).json({
                message: err
            })
            row[0].tasks = tasksRows || []
            row[0].realCost = tasksRows.reduce((a, b) => {
                const doneCost = b.done ? b.cost : 0
                return a + doneCost
            }, 0)
            row[0].progress = tasksRows.filter(i => i.done).length / tasksRows.length
            return res.status(200).json(row[0])
        })
    })
})


module.exports = router