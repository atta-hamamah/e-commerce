import React from 'react'

function page({ params }: { params: { id: number } }) {
    return (
        <div>page{params.id}</div>
    )
}

export default page