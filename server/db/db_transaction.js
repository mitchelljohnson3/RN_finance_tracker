sconst query = require("./connection");

const submitTransaction = async (data) => {
  const { typeid, categoryid, amount, date, description } = data;
  const _query = `insert into Transactions(typeid,categoryid,amount,date,description) 
                  values('${typeid}','${categoryid}',${amount},"${date}","${description}")`;
  console.log("inserted new transaction");
  return await query(_query);
};

const deleteTransaction = async (data) => {
  const _query = `delete from Transactions where id = ${data.id}`;
  console.log(`deleted transaction with id ${data.id}`);
  return await query(_query);
};

const fetchTransactions = async (data) => {
  const {
    type,
    dateStart,
    dateEnd,
    descriptionContains,
    category,
    sortBy,
    ascending,
    limit,
    offset,
  } = data;
  let { amountOver, amountUnder } = data;
  // check if amountOver or amountUnder is a number
  if (isNaN(amountOver)) amountOver = "";
  if (isNaN(amountUnder)) amountUnder = "";
  // mysql query base
  const base = `select Transactions.id,Type.name as type,amount,date,Category.name as category,description 
                from Transactions 
                join Category on (categoryid = Category.id)
                join Type on (typeid = Type.id)`;
  // creating filter strings
  const _type = type ? `type = "${type}"` : ``;
  const _dateStart = dateStart ? `date > "${dateStart}"` : ``;
  const _dateEnd = dateEnd ? `date < "${dateEnd}"` : ``;
  const _amountOver = amountOver ? `amount > ${amountOver}` : ``;
  const _amountUnder = amountUnder ? `amount < ${amountUnder}` : ``;
  const _descriptionContains = descriptionContains
    ? `description like "%${descriptionContains}%"`
    : ``;
  const _category = category ? `category = "${category}"` : ``;
  // combining filters into one string
  const filters = [];
  if (_type) filters.push(_type);
  if (_dateStart) filters.push(_dateStart);
  if (_dateEnd) filters.push(_dateEnd);
  if (_amountOver) filters.push(_amountOver);
  if (_amountUnder) filters.push(_amountUnder);
  if (_descriptionContains) filters.push(_descriptionContains);
  if (_category) filters.push(_category);
  const _filters = filters.length ? `having ` + filters.join(` AND `) : ``;
  // how to sort the results
  const _sortBy = `order by ${sortBy} ` + (ascending ? `ASC` : `DESC`);
  // applies limit and offset
  const _limit = `limit ${limit}`;
  const _offset = `offset ${offset}`;
  const _query = `${base} ${_filters} ${_sortBy} ${_limit} ${_offset};`;
  return await query(_query);
};

const fetchSummary = async (data) => {
  const { dateStart, dateEnd } = data;
  const _query = `select date, amount, typeid, categoryid from Transactions where
                  date > "${dateStart}" and date < "${dateEnd}" order by date`;
  const results = await query(_query);
  // isolate expense and income data
  const expenseData = results.filter(
    ({ date, amount, typeid }) => typeid == "E"
  );
  const incomeData = results.filter(
    ({ date, amount, typeid }) => typeid == "I"
  );
  // calculate breakdown sums
  let suppliesSum = 0;
  let insuranceSum = 0;
  let taxSum = 0;
  for (let i = 0; i < expenseData.length; i++) {
    const amount = expenseData[i].amount;
    switch (expenseData[i].categoryid) {
      case "S":
        suppliesSum += amount;
        break;
      case "I":
        insuranceSum += amount;
        break;
      case "T":
        taxSum += amount;
        break;
    }
  }
  let etsySum = 0;
  let marketSum = 0;
  for (let i = 0; i < incomeData.length; i++) {
    const amount = incomeData[i].amount;
    switch (incomeData[i].categoryid) {
      case "E":
        etsySum += amount;
        break;
      case "M":
        marketSum += amount;
        break;
    }
  }
  // calculate expense and income sum
  let expenseSum = 0;
  for (let i = 0; i < expenseData.length; i++) {
    expenseSum += expenseData[i].amount;
    expenseData[i].amount = expenseSum;
  }
  let incomeSum = 0;
  for (let i = 0; i < incomeData.length; i++) {
    incomeSum += incomeData[i].amount;
    incomeData[i].amount = incomeSum;
  }

  return {
    income: incomeData,
    expense: expenseData,
    totalLoss: -expenseSum,
    totalGain: incomeSum,
    breakdown: {
      suppliesSum: suppliesSum,
      insuranceSum: insuranceSum,
      taxSum: taxSum,
      etsySum: etsySum,
      marketSum: marketSum,
    },
  };
};

module.exports = {
  submitTransaction,
  deleteTransaction,
  fetchTransactions,
  fetchSummary,
};
