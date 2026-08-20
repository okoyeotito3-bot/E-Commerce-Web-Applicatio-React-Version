export default function CheckOut({totalPrice}){
  return <div className="w-full max-w-md 
bg-white border border-gray-100
rounded-2xl shadow-2xl p-5 flex flex-col
gap-4 sticky bottom-20 mx-auto">
    
    
<div className="flex justify-between items-center">
<span className="text-gray-500 text-sm">
Total items</span>

<span className="font-semibold text-gray-900">
  Cart
</span>
</div>


<div className="border-t border-gray-100 pt-4 flex justify-between items-center">
  <span className="text-lg font-semibold 
text-gray-900">Total</span>

<span className="text-2xl font-bold text-cyan-500">${totalPrice}</span>
</div>

<button className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 active:scale-[0.98] transition-all text-white
font-bold shadow-lg shadow-cyan-200">
Continue to Checkout →
</button>

<p className="text-xs text-center 
text-gray-400">
Secure checkout • Fast delivery
</p>

</div>

}

