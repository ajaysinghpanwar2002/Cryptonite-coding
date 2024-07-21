'use client'

import { useEffect } from 'react';
import { closestCenter, DndContext } from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { addCoinA, removeCoinA, setCoinsA } from '@/lib/store/features/dragable/coinsTableA';
import { addCoinB, removeCoinB } from '@/lib/store/features/dragable/coinsTableB';

const SortableCoinsList = ({ coin, router }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: coin.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    return (
        <tr ref={setNodeRef} {...attributes} {...listeners} style={style} key={coin.id}>
            <td className="py-2 px-4 border-b border-gray-200" onClick={() => router.push(`/explore/${coin.id}`)}>
                <Image src={coin.image ?? '/default-image.png'} alt={coin.name ?? 'Unknown'} className="w-6 h-6" height={20} width={20} />
            </td>
            <td className="py-2 px-4 border-b border-gray-200 hover:cursor-pointer" >{coin.name ?? 'Unknown'} ({coin.symbol?.toUpperCase() ?? 'N/A'})</td>
            <td className="py-2 px-4 border-b border-gray-200">{coin.market_cap?.toLocaleString() ?? 'N/A'}</td>
            <td className="py-2 px-4 border-b border-gray-200">{coin.current_price?.toLocaleString() ?? 'N/A'}</td>
            <td className="py-2 px-4 border-b border-gray-200">{coin.high_24h?.toLocaleString() ?? 'N/A'}</td>
            <td className="py-2 px-4 border-b border-gray-200">{coin.low_24h?.toLocaleString() ?? 'N/A'}</td>
        </tr>
    )
}

function ExploreTable({ data }) {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const coinsTableA = useAppSelector((state) => state.coinsTableA.coins);
    const coinsTableB = useAppSelector((state) => state.coinsTableB.coins);

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const activeCoin = coinsTableA.find(coin => coin.id === active.id) || coinsTableB.find(coin => coin.id === active.id);
        if (!activeCoin) return;

        if (coinsTableA.some(coin => coin.id === active.id)) {
            dispatch(removeCoinA(active.id));
            dispatch(addCoinB(activeCoin));
        } else {
            dispatch(removeCoinB(active.id));
            dispatch(addCoinA(activeCoin));
        }
    }

    useEffect(() => {
        dispatch(setCoinsA(data));
    }, [data, dispatch])

    return (
        <div className="overflow-x-auto">
            <div
                className="overflow-y-auto"
                style={{
                    maxHeight: '500px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent',
                }}
            >
                <style jsx>
                    {`
                ::-webkit-scrollbar {
                    width: 5px;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: transparent;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                div:hover ::-webkit-scrollbar-thumb {
                    background-color: #a0aec0; /* Gray-400 */
                }
            `}
                </style>
                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Image</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Name (Symbol)</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Market Cap</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Current Price</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Highest 24h</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Lowest 24h</th>
                            </tr>
                        </thead>
                        <tbody>
                            <SortableContext items={coinsTableA} strategy={verticalListSortingStrategy}>
                                {coinsTableA.map((coin) => (
                                    <SortableCoinsList key={coin.id} coin={coin} router={router} />
                                ))}
                            </SortableContext>
                            {/* <SortableContext items={coinsTableB} strategy={verticalListSortingStrategy}>
                                {coinsTableB.map((coin) => (
                                    <SortableCoinsList key={coin.id} coin={coin} router={router} />
                                ))}
                            </SortableContext> */}
                        </tbody>
                    </table>
                </DndContext>
            </div>
        </div>
    );
}

export default ExploreTable;
