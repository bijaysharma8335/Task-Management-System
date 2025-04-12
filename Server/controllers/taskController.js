const Notification = require("../models/notification");
const Task = require("../models/task");
const User = require("../models/user");

const createTask = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, team, stage, date, priority, assets } = req.body;
        let text = "New task has been assigned to you";
        if (team?.length > 1) {
            text = text + ` and ${team?.length - 1} others.`;
        }

        text =
            text +
            `The task priority i set a ${priority} priority , so check and act accordingly. THe task date is ${new Date(
                date
            ).toDateString()}. Thank You `;
        const activity = { type: "assigned", activity: text, by: userId };
        const task = await Task.create({
            title,
            team,
            stage: stage.toLowerCase(),
            date,
            priority: priority.toLowerCase(),
            assets,
            activities: activity,
        });
        await Notification.create({ team, text, task: task._id });
        res.status(200).json({ status: true, message: "Task created Successfully" });
    } catch (error) {
        console.log(error);

        return res.status(400).json({ status: false, message: error.message });
    }
};

const postTaskActivity = async (req, res) => {
    try {
        const { id } = req.params;

        const { userId } = req.user;
        const { type, activity } = req.body;

        const task = await Task.findById(id);
        const data = {
            type,
            activity,
            by: userId,
        };

        task.activities.push(data);
        await task.save();

        res.status(200).json({ status: true, message: "Activity posted successfully" });
    } catch (error) {
        console.log(error);

        return res.status(400).json({ status: false, message: error.message });
    }
};

const dashboardStatistics = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user;
        const allTasks = isAdmin
            ? await Task.find({ isTrashed: false })
                  .populate({ path: "team", select: "name role title email" })
                  .sort({ _id: -1 })
            : await Task.find({ isTrashed: false, team: { $all: [userId] } })
                  .populate({ path: "team", select: "name role title email" })
                  .sort({ _id: -1 });

        const users = await User.find({ isActive: true })
            .select("name title role isAdmin createdAt")
            .limit(10)
            .sort({ _id: -1 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

const duplicateTask = async (req, res) => {
    try {
        const { id } = -req.params;
        const task = await Task.findById(id);

        const newTask = await Task.create({ ...task, title: task.title + "-Duplicate" });

        newTask.team = task.team;
        newTask.subTasks = task.subTasks;
        newTask.assets = task.assets;
        newTask.priority = task.priority;
        newTask.stage = task.stage;

        await newTask.save();

        let text = "New task has been assigned to you";
        if (task.team.length > 1) {
            text = text + `and ${task.team.length - 1} others.`;
        }

        text =
            text +
            ` THe task priority is set a  ${
                task.priority
            } priority, socheck and act accordingly. The task date is  ${task.date.toDateString()}. Thank You!`;
        res.status(200).json({ status: true, message: "Task duplicated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id).populate({
            path: "team",
            select: "name title role email",
        });
        res.status(200).json({ status: true, task });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const { stage, isTrashed } = req.query;
        let query = { isTrashed: isTrashed ? true : false };
        if (stage) {
            query.stage;
        }
        let queryResult = Task.find(query)
            .populate({ path: "team", select: "name title email" })
            .sort({ _id: -1 });

        const tasks = await queryResult;

        res.status(200).json({ status: true, tasks });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

const createSubTask = async (req, res) => {
    try {
        const { title, tag, date } = req.body;
        const { id } = req.params;

        const newSubTask = { title, tag, date };

        const task = await Task.findById(id);

        task.subTasks.push(newSubTask);

        await task.save();
    } catch (error) {
        console.log(error);

        return res.status(400).json({ status: false, message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, team, stage, priority, assets } = req.body;
        const task = await Task.findById(id);

        task.title = title;
        task.date = date;
        task.team = team;
        task.stage = stage.toLowerCase();
        task.priority = priority.toLowerCase();
        task.assets = assets;
        await task.save();

        res.status(200).json({ status: true, message: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

const trashTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        task.isTrashed = true;

        await task.save();

        res.status(200).json({ status: true, message: "Task trashed successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
const deleteRestoreTask = async (req, res) => {
    try {
        const { id } = req.params;

        const { actionType } = req.query;

        if (actionType === "delete") {
            await Task.findByIdAndDelete(id);
        } else if (actionType === "deleteAll") {
            await Task.deleteMany({ isTrashed: true });
        } else if (actionType === "restore") {
            const response = await Task.findById(id);

            response.isTrashed = false;
            response.save();
        } else if (actionType === "restoreAll") {
            await Task.updateMany({ isTrashed: true }, { $set: { isTrashed: false } });
        }

        res.status(200).json({ status: true, message: "OPeration performed successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};
module.exports = {
    createTask,
    duplicateTask,
    updateTask,
    trashTask,
    getTask,
    getTasks,
    createSubTask,
    deleteRestoreTask,
    postTaskActivity,
    dashboardStatistics,
};
