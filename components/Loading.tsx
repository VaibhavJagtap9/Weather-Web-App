'use client';
import React from 'react'

const Loading = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>

        </div>
    )
}

export default Loading;