import React, { lazy, Suspense } from "react";

const MainFooter = lazy(()=>import("./components/MainFooter"))

const Footer = function(){
    return (
        <Suspense fallback={false}>
            <MainFooter/>
        </Suspense>
    )
        
}

export default React.memo(Footer)