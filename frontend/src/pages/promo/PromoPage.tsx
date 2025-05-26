import React from "react"
import HeadlinePromo from "./HeadlinePromo"

const PromoPage = function(){
    return (
        <div className="mobile px-6 md:px-0 flex flex-col gap-y-20">
            <HeadlinePromo/>
        </div>
    )
}

export default React.memo(PromoPage)