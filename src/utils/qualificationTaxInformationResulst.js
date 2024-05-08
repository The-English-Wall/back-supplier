export const qualificationTaxResults = async (body) => {
    const { currentAssets, currentLiabilities, inventories, financialObligations, netWorth, taxInformationIsAvailable } = body
    if (!taxInformationIsAvailable) {
        return 0
    }
    const weigthResults = 0.20
    let liquidityRadio, acidLiquidityRadio, capitalWork, debtLevel, netWorthRatio
    if (currentAssets > 0 && currentLiabilities > 0) {
        liquidityRadio = currentAssets / currentLiabilities
        capitalWork = currentAssets - currentLiabilities > 0 ? 20 : 0

        if (liquidityRadio < 1) {
            liquidityRadio = 0
        }
        if (liquidityRadio >= 1 && liquidityRadio < 2) {
            liquidityRadio = 15
        }
        if (liquidityRadio >= 2) {
            liquidityRadio = 25
        }
    }
    if (currentAssets > 0 && currentLiabilities > 0, inventories > 0) {
        acidLiquidityRadio = (currentAssets - inventories) / currentLiabilities
        if (acidLiquidityRadio < 1.5) {
            acidLiquidityRadio = 0
        }
        if (acidLiquidityRadio >= 1.5 && acidLiquidityRadio < 2) {
            acidLiquidityRadio = 15
        }
        if (acidLiquidityRadio >= 2) {
            acidLiquidityRadio = 25
        }
    }
    if (financialObligations > 0 && netWorth > 0) {
        debtLevel = financialObligations / netWorth
        netWorthRatio = netWorth > 0 ? 10 : 0
        if (debtLevel > 1) {
            debtLevel = 0
        }
        if (debtLevel > 0.6 && debtLevel <= 1) {
            debtLevel = 5
        }
        if (debtLevel > 0.5 && debtLevel <= 0.6) {
            debtLevel = 10
        }
        if (debtLevel <= 0.5) {
            debtLevel = 20
        }

    }
    const results = Math.floor((weigthResults + liquidityRadio + acidLiquidityRadio + capitalWork + debtLevel + netWorthRatio) * weigthResults)
    return results
}