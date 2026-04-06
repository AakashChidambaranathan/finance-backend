const Record = require("../models/recordSchema");
exports.getTotalIncome = async (req, res) => {
  try {
    const result = await Record.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({ totalIncome: result[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getTotalExpense = async (req, res) => {
  try {
    const result = await Record.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({ totalExpense: result[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getNetBalance = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let income = 0,
      expense = 0;

    result.forEach((r) => {
      if (r._id === "income") income = r.total;
      if (r._id === "expense") expense = r.total;
    });

    res.json({ netBalance: income - expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getCategoryWise = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getMonthlyTrends = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};