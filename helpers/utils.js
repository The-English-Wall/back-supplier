// const qualificationTaxResults = async (body) => {
//   const { currentAssets, currentLiabilities, inventories, financialObligations, netWorth, taxInformationIsAvailable } = body;

//   if (!taxInformationIsAvailable) {
//     return 0;
//   }

//   const weightResults = 0.20;
//   let liquidityRatio = 0,
//     acidLiquidityRatio = 0,
//     capitalWork = 0,
//     debtLevel = 0,
//     netWorthRatio = 0;

//   if (currentAssets > 0 && currentLiabilities > 0) {
//     liquidityRatio = currentAssets / currentLiabilities;
//     capitalWork = currentAssets - currentLiabilities > 0 ? 20 : 0;

//     if (liquidityRatio < 1) {
//       liquidityRatio = 0;
//     } else if (liquidityRatio < 2) {
//       liquidityRatio = 15;
//     } else {
//       liquidityRatio = 25;
//     }
//   }

//   if (currentAssets > 0 && currentLiabilities > 0 && inventories > 0) {
//     acidLiquidityRatio = (currentAssets - inventories) / currentLiabilities;

//     if (acidLiquidityRatio < 1.5) {
//       acidLiquidityRatio = 0;
//     } else if (acidLiquidityRatio < 2) {
//       acidLiquidityRatio = 15;
//     } else {
//       acidLiquidityRatio = 25;
//     }
//   }

//   if (financialObligations > 0 && netWorth > 0) {
//     debtLevel = financialObligations / netWorth;
//     netWorthRatio = netWorth > 0 ? 10 : 0;

//     if (debtLevel > 1) {
//       debtLevel = 0;
//     } else if (debtLevel > 0.6) {
//       if (debtLevel <= 1) {
//         debtLevel = 5;
//       } else if (debtLevel <= 0.6) {
//         debtLevel = 10;
//       } else {
//         debtLevel = 20;
//       }
//     }
//   }

//   const results = Math.floor(
//     (weightResults + liquidityRatio + acidLiquidityRatio + capitalWork + debtLevel + netWorthRatio) * weightResults
//   );
//   return results;
// }

const qualificationTaxResults = async (body)=> {
  const {currentAssets, currentLiabilities, inventories, financialObligations, netWorth, taxInformationIsAvailable} = body
  if (!taxInformationIsAvailable) {
    return 0
  }
  const weigthResults = 0.20
  let liquidityRadio, acidLiquidityRadio, capitalWork, debtLevel, netWorthRatio
  if(currentAssets > 0 && currentLiabilities > 0) {
    liquidityRadio = currentAssets/currentLiabilities
    capitalWork = currentAssets-currentLiabilities > 0 ? 20 : 0

    if(liquidityRadio < 1) {
      liquidityRadio = 0
    }
    if(liquidityRadio >= 1 && liquidityRadio < 2) {
      liquidityRadio = 15
    }
    if(liquidityRadio >= 2) {
      liquidityRadio = 25
    }
  }
  if(currentAssets > 0 && currentLiabilities > 0, inventories > 0) {
    acidLiquidityRadio = (currentAssets-inventories)/currentLiabilities
    if(acidLiquidityRadio < 1.5) {
      acidLiquidityRadio = 0
    }
    if(acidLiquidityRadio >= 1.5 && acidLiquidityRadio < 2) {
      acidLiquidityRadio = 15
    }
    if(acidLiquidityRadio >= 2) {
      acidLiquidityRadio = 25
    }
  }
  if(financialObligations > 0 && netWorth > 0) {
    debtLevel = financialObligations/netWorth
    netWorthRatio = netWorth > 0 ? 10 : 0
    if(debtLevel > 1) {
      debtLevel = 0
    }
    if(debtLevel > 0.6 && debtLevel <= 1) {
      debtLevel = 5
    }
    if(debtLevel > 0.5 && debtLevel <= 0.6) {
      debtLevel = 10
    }
    if(debtLevel <= 0.5) {
      debtLevel = 20
    }
    
  }
  const results = Math.floor((weigthResults + liquidityRadio + acidLiquidityRadio + capitalWork + debtLevel + netWorthRatio) * weigthResults)
  return results
}

const qualificationComercialResults = async (data) => {
  const {isServiceSupplier, experienceYears, hasPostSaleService=false, hasTrainingService=false, hasReturnPolicy=false, hasWarranty=false, deliveryAverageDays} = data;

  const weightResults = 0.25;
  let experienceResults,
  hasPostSaleServiceResults = 0,
  hasTrainingServiceResults = 0,
  hasReturnPolicyResults = 0,
  hasWarrantyResults = 0,
  deliveryAverageDaysResults = 0
  
  if(experienceYears <= 1) {
    experienceResults= 0
  }
  if(experienceYears >1 && experienceYears < 5) {
    experienceResults = isServiceSupplier ? 15 : 10
  }
  if(experienceYears > 5) {
    experienceResults =  isServiceSupplier ? 20 : 15
  }
  

  if(hasPostSaleService) {
    hasPostSaleServiceResults = isServiceSupplier ? 20 : 15
  }
  if(hasTrainingService) {
    hasTrainingServiceResults = isServiceSupplier ? 15 : 10
  }
  if(hasReturnPolicy) {
    hasReturnPolicyResults = isServiceSupplier ? 20 : 20
  }
  if(hasWarranty) {
    hasWarrantyResults = isServiceSupplier ? 25 : 20
  }
  
  if(!isServiceSupplier) {
    if(deliveryAverageDays <=1) {
      deliveryAverageDaysResults = 20
    }
    if(deliveryAverageDays > 1 && deliveryAverageDays < 3) {
      deliveryAverageDaysResults = 15
    }
    if(deliveryAverageDays >= 3 && deliveryAverageDays < 6) {
      deliveryAverageDaysResults = 10
    }
    if(deliveryAverageDays >= 6 && deliveryAverageDays < 9) {
      deliveryAverageDaysResults = 5
    }
  }

  const results = Math.floor(
    (experienceResults + hasPostSaleServiceResults + hasTrainingServiceResults + hasReturnPolicyResults + hasWarrantyResults + deliveryAverageDaysResults) * weightResults
  );
  return results;
  
}

const qualificationHseqResults = async (data) => {
  const {hasQualityCertified, hasEnvironmentCertified, hasSstCertified, hasSupplyChainSafetyCertified, hasSafetyCertified, accidentRatio, enterToFacilities=false} = data;

  const weightResults = 0.30;
  let hasQualityCertifiedResults = 0,
  hasEnvironmentCertifiedResults = 0,
  hasSstCertifiedResults = 0,
  hasSupplyChainSafetyCertifiedResults = 0,
  hasSafetyCertifiedResults = 0,
  accidentRatioResults = 0
  
  if(hasQualityCertified) {
    hasQualityCertifiedResults = enterToFacilities ? 10 : 15
  }
  if(hasEnvironmentCertified) {
    hasEnvironmentCertifiedResults = enterToFacilities ? 10 : 15
  }
  if(hasSstCertified) {
    hasSstCertifiedResults = enterToFacilities ? 30 : 15
  }
  if(hasSupplyChainSafetyCertified) {
    hasSupplyChainSafetyCertifiedResults = enterToFacilities ? 10 : 15
  }
  if(hasSafetyCertified) {
    hasSafetyCertifiedResults = enterToFacilities ? 10 : 15
  }

  if(accidentRatio <= 0.05 ) {
    accidentRatioResults = enterToFacilities ? 30 : 25
  } else if(accidentRatio > 0.05 &&  accidentRatio <= 0.1 ) {
    accidentRatioResults = enterToFacilities ? 20 : 25
  } else if(accidentRatio > 0.1 && accidentRatio <= 0.15) {
    accidentRatioResults = enterToFacilities ? 15 : 20
  } else if(accidentRatio > 0.15 && accidentRatio <= 0.2) {
    accidentRatioResults = enterToFacilities ? 10 : 15
  } else if(accidentRatio > 0.2 && accidentRatio <= 0.25) {
    accidentRatioResults = enterToFacilities ? 5 : 10
  } else if(accidentRatio > 0.25 && accidentRatio <= 0.3) {
    accidentRatioResults = enterToFacilities ? 0 : 5
  }

  const results = Math.floor(
    (hasQualityCertifiedResults + hasEnvironmentCertifiedResults + hasSstCertifiedResults + hasSupplyChainSafetyCertifiedResults + hasSafetyCertifiedResults + accidentRatioResults) * weightResults
  );
  return results;
  
}

const qualificationSafetyResults = async(data) => {
  const {hasSarlaftSystems, hasSagrilaftSystems, hasSiplaftSystems, hasOfacReport} = data;


  const weightResults = 0.25;
  let hasSarlaftSystemsResults = 0,
  hasSagrilaftSystemsResults = 0,
  hasSiplaftSystemsResults = 0,
  hasOfacReportResults = 0

  if(!hasSarlaftSystems.notApplicable && hasSarlaftSystems.hasSystem) {
    hasSarlaftSystemsResults = 20
  }
  if(!hasSagrilaftSystems.notApplicable && hasSagrilaftSystems.hasSystem) {
    hasSagrilaftSystemsResults = 15
  }
  if(!hasSiplaftSystems.notApplicable && hasSiplaftSystems.hasSystem) {
    hasSiplaftSystemsResults = 15
  }
  if(!hasOfacReport) {
    hasOfacReportResults = 50
  }

  const results = Math.floor(
    (hasSarlaftSystemsResults + hasSagrilaftSystemsResults + hasSiplaftSystemsResults + hasOfacReportResults) * weightResults
  );
  return results;

}

module.exports = {qualificationTaxResults, qualificationComercialResults, qualificationHseqResults, qualificationSafetyResults}