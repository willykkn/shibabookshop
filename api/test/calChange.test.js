const {calChange} = require("../index");

const html = `<input type="number" id="moneyInput" value="100" style="width:100%;height:30px;justify-items:center"></input>`;
document.getElementById("cart").innerHTML = html;
test("calChange, money 100 - net 50 = change 50", () => {
  expect(calChange(50, +document.getElementById("moneyInput").value)).toBe(50);
});
