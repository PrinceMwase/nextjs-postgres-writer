'use client'
import { payload } from "@/components/poem/view"
import React from "react";

interface PoemContextProps {
    currentPoem: payload | null;
    allPoems: payload[] | null;
    hasMore: boolean;
    setAllPoems: (payload: payload[] | null) => void;
    setCurrentPoem: (payload: payload | null) => void;
    setHasMore: (payload: boolean) => void;
}

const PoemContext = React.createContext<PoemContextProps>({
    currentPoem:null,
    allPoems:null,
    setAllPoems: ()=> {},
    setCurrentPoem: ()=> {},
    setHasMore: ()=> {},
    hasMore: true,
})

export default PoemContext;