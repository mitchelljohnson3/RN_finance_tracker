// options for expense transactions
const expenseOptions = [
  {
    label: "Supplies",
    key: "S",
    icon: "brush",
  },
  {
    label: "Tax",
    key: "T",
    icon: "cash",
  },
  {
    label: "Insurance",
    key: "I",
    icon: "shield-half-full",
  },
];
// options for income transactions
const incomeOptions = [
  {
    label: "Etsy",
    key: "E",
    icon: "shopping-outline",
  },
  {
    label: "Market",
    key: "M",
    icon: "basket-outline",
  },
];
// options for transaction types
const typeOptions = [
  {
    label: "Expense",
    key: "E",
    icon: "cash-minus",
  },
  {
    label: "Income",
    key: "I",
    icon: "cash-plus",
  },
];
// sort by options
const sortOptions = [
  {
    label: "Date",
    key: "D",
    icon: "calendar-clock",
  },
  {
    label: "Amount",
    key: "A",
    icon: "currency-usd",
  },
];
// sort mode options
const sortModeOptions = [
  {
    label: "Ascending",
    key: "A",
    icon: "arrow-up-bold-outline",
  },
  {
    label: "Descending",
    key: "D",
    icon: "arrow-down-bold-outline",
  },
];
// icons for filter bubbles
const bubbleIcons = {
  type: "currency-usd",
  dateStart: "sort-calender-ascending",
  dateEnd: "sort-calender-descending",
  amountOver: "cash-plus",
  amountUnder: "cash-minus",
  descriptionContains: "book-open-outline",
  category: "format-list-bulleted-type",
  sortBy: "calendar-clock",
  descending: "sort-alphabetical-ascending-variant",
};
// default filter object
const defaultFilter = {
  type: "",
  dateStart: "",
  dateEnd: "",
  amountOver: "",
  amountUnder: "",
  descriptionContains: "",
  category: "",
  sortBy: "Date",
  ascending: false,
};
const defaultSummaryData = {
  income: [],
  expense: [],
  totalLoss: 0,
  totalGain: 0,
  breakdown: {
    suppliesSum: 0,
    insuranceSum: 0,
    taxSum: 0,
    etsySum: 0,
    marketSum: 0,
  },
};

export {
  bubbleIcons,
  defaultFilter,
  expenseOptions,
  incomeOptions,
  typeOptions,
  sortOptions,
  sortModeOptions,
  defaultSummaryData,
};
