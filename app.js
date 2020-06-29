const readline = require('readline');
const r = readline.createInterface({
	input: process.stdin,
	output: process.stdout
  })
const items = [
	{
		id: 1,
		name: 'Soap',
		price: 10
	},
	{
		id: 2,
		name: 'Tooth Paste',
		price: 20
	},
	{
		id: 3,
		name: 'Ice cream',
		price: 30
	},
];
var order = {
	id: 0,
	quantity: 0
}
var total = 0;

const question1 = () => {
  return new Promise((resolve, reject) => {
  	let itemlist = '';
  	items.map(function(item){
		itemlist += item.id+') '+item.name+' - '+item.price+' rupees/item\n';
	})
	r.question(`Hey there, We have the following items in our shop.\n${itemlist}What do you want to purchase today?\n user input :-`, (answer) => {
      order.id = answer;
      resolve()
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    r.question('How many? \n user input :- ', (answer) => {
      order.quantity = answer;
      resolve()
    })
  })
}

const question3 = () => {
  return new Promise((resolve, reject) => {
    r.question('Anything else ?(Yes/No) \n user input :- ', (answer) => {
    	addTotal()
      if(answer === 'yes'){
      	main()
      } else {
      	resolve()
      	console.log(`Calculating your bill...\n`);
      	console.log(`Your bill is ${total} rupees`);
      }
    })
  })
}

const addTotal = () => {
	let totalItems = items.filter((item) => {
		if(item.id == order.id)
			return item
	})
	total += totalItems[0].price * order.quantity;
}

const main = async () => {
  await question1()
  await question2()
  await question3()
  r.close()
}

main()