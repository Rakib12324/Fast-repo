// Full prototype of a finance dashboard in React with Tailwind CSS // This is a minimal prototype for a budgeting + investment tracker

import React, { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const expenseData = [ { category: "Food", amount: 200 }, { category: "Rent", amount: 800 }, { category: "Utilities", amount: 150 }, ];

const investmentData = [ { date: "Jan", value: 1000 }, { date: "Feb", value: 1200 }, { date: "Mar", value: 1350 }, ];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function FinanceDashboard() { const [expenses, setExpenses] = useState(expenseData); const [newExpense, setNewExpense] = useState({ category: "", amount: "" });

const addExpense = () => { if (newExpense.category && newExpense.amount) { setExpenses([...expenses, { ...newExpense, amount: parseFloat(newExpense.amount) }]); setNewExpense({ category: "", amount: "" }); } };

return ( <main className="p-6 max-w-4xl mx-auto"> <h1 className="text-3xl font-bold mb-4">Finance Dashboard</h1> <Tabs defaultValue="dashboard"> <TabsList className="mb-4"> <TabsTrigger value="dashboard">Dashboard</TabsTrigger> <TabsTrigger value="expenses">Expenses</TabsTrigger> <TabsTrigger value="investments">Investments</TabsTrigger> </TabsList>

<TabsContent value="dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="h-64">
            <h2 className="text-xl font-semibold mb-2">Expenses Breakdown</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="amount"
                  data={expenses}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {expenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="h-64">
            <h2 className="text-xl font-semibold mb-2">Investment Growth</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={investmentData}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </TabsContent>

    <TabsContent value="expenses">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Category"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            />
            <Input
              placeholder="Amount"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <Button onClick={addExpense}>Add</Button>
          </div>
          <ul className="space-y-2">
            {expenses.map((item, i) => (
              <li key={i} className="border p-2 rounded">
                {item.category}: ${item.amount}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="investments">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Investment Data (Demo)</h2>
          <ul className="space-y-2 mt-4">
            {investmentData.map((item, i) => (
              <li key={i} className="border p-2 rounded">
                {item.date}: ${item.value}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</main>

); }

