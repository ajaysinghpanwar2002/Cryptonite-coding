'use client'

import { increment } from '@/lib/store/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks'
import React from 'react'

function Product({data}: {data: {name: string, age: number}}) {
    const dispatch = useAppDispatch()

    // this is how you set
    const handleAddToCart = (id: string) => {
        dispatch(increment(id))
        console.log('add to cart')
    }

    // this is how you get
    const items = useAppSelector(state => state.cart.items)

    return (
        <div>
            <button onClick={()=>handleAddToCart('1231')}>Click me</button>
            <div>
                {items.map(item => (
                    <div key={item}>{item}</div>
                ))}
            </div>
        </div>
    )
}

export default Product