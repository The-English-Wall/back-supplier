export const qualificationComercialResults = async (data) => {
    const { isServiceSupplier, experienceYears, hasPostSaleService, hasTrainingService, hasReturnPolicy, hasWarranty, deliveryAverageDays } = data;

    const weightResults = 0.25;
    let experienceResults,
        hasPostSaleServiceResults = 0,
        hasTrainingServiceResults = 0,
        hasReturnPolicyResults = 0,
        hasWarrantyResults = 0,
        deliveryAverageDaysResults = 0

    if (experienceYears <= 1) {
        experienceResults = 0
    }
    if (experienceYears > 1 && experienceYears < 5) {
        experienceResults = isServiceSupplier ? 15 : 10
    }
    if (experienceYears > 5) {
        experienceResults = isServiceSupplier ? 20 : 15
    }


    if (hasPostSaleService) {
        hasPostSaleServiceResults = isServiceSupplier ? 20 : 15
    }
    if (hasTrainingService) {
        hasTrainingServiceResults = isServiceSupplier ? 15 : 10
    }
    if (hasReturnPolicy) {
        hasReturnPolicyResults = isServiceSupplier ? 20 : 20
    }
    if (hasWarranty) {
        hasWarrantyResults = isServiceSupplier ? 25 : 20
    }

    if (!isServiceSupplier) {
        if (deliveryAverageDays <= 1) {
            deliveryAverageDaysResults = 20
        }
        if (deliveryAverageDays > 1 && deliveryAverageDays < 3) {
            deliveryAverageDaysResults = 15
        }
        if (deliveryAverageDays >= 3 && deliveryAverageDays < 6) {
            deliveryAverageDaysResults = 10
        }
        if (deliveryAverageDays >= 6 && deliveryAverageDays < 9) {
            deliveryAverageDaysResults = 5
        }
    }

    const results = Math.floor(
        (experienceResults + hasPostSaleServiceResults + hasTrainingServiceResults + hasReturnPolicyResults + hasWarrantyResults + deliveryAverageDaysResults) * weightResults
    );
    return results;
}