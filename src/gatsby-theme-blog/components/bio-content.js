import React from "react";
import { Themed } from "theme-ui";

/**
 * Change the content to add your own bio
 */

export default function Bio() {
    return (
        <>
            Words by{" "}
            <Themed.a href="https://amaechler.com/">Andreas Maechler</Themed.a>.
            <br />
            Change me. This is all quite default.
        </>
    );
}
