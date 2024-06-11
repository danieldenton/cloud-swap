import { createSelector } from "reselect"

const tokens = state => state .tokens.contracts 
const swaps = state => state.amm.swaps

export const chartSelector =  createSelector(swaps, tokens, (swaps, tokens) => {
    console.log(swaps, tokens)

    return({
        series: [{
            name: "Rate",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
    })
})

