const handleError500 = (res, error) => {
    res.status(500).json({ message: 'Error fetching users', error });
};

export{
    handleError500
};
