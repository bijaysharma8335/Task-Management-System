const createTask = async (req, res) => {
    try {
        const{userId}=req.user;
        const{title,team,stage,date,priority,assets}=req.body;
        let text="New task has been assigned to you";
        if(team?.length>1){
            text=text+` and ${team?.length -1} others.`;
        }
        const task=await Task.create({})
    } catch (error) {}
};

const duplicateTask = async (req, res) => {
    try {
    } catch (error) {}
};

const getTask = async (req, res) => {
    try {
    } catch (error) {}
};

const getTasks = async (req, res) => {
    try {
    } catch (error) {}
};

const createSubTask = async (req, res) => {
    try {
    } catch (error) {}
};

const updateTask = async (req, res) => {
    try {
    } catch (error) {}
};

const trashTask = async (req, res) => {
    try {
    } catch (error) {}
};
