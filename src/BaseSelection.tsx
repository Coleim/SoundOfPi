// import { useStore } from "@tanstack/react-store";
// import { base } from "./base";

export function BaseSelection() {

    // const currentBase: number = useStore(base, (state) => state.currentBase);

    return (
        <div className="all-constants">
            <input type="checkbox" />
            <label>Base 10</label>
        </div>
    )
}

