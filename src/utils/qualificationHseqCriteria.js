export const qualificationHseqResults = async (data) => {
    const { hasQualityCertified, hasEnvironmentCertified, hasSstCertified, hasSupplyChainSafetyCertified, hasSafetyCertified, accidentRatio, enterToFacilities } = data;

    const weightResults = 0.30;
    let hasQualityCertifiedResults = 0,
        hasEnvironmentCertifiedResults = 0,
        hasSstCertifiedResults = 0,
        hasSupplyChainSafetyCertifiedResults = 0,
        hasSafetyCertifiedResults = 0,
        accidentRatioResults = 0

    if (hasQualityCertified) {
        hasQualityCertifiedResults = enterToFacilities ? 10 : 15
    }
    if (hasEnvironmentCertified) {
        hasEnvironmentCertifiedResults = enterToFacilities ? 10 : 15
    }
    if (hasSstCertified) {
        hasSstCertifiedResults = enterToFacilities ? 30 : 15
    }
    if (hasSupplyChainSafetyCertified) {
        hasSupplyChainSafetyCertifiedResults = enterToFacilities ? 10 : 15
    }
    if (hasSafetyCertified) {
        hasSafetyCertifiedResults = enterToFacilities ? 10 : 15
    }

    if (accidentRatio <= 0.05) {
        accidentRatioResults = enterToFacilities ? 30 : 25
    } else if (accidentRatio > 0.05 && accidentRatio <= 0.1) {
        accidentRatioResults = enterToFacilities ? 20 : 25
    } else if (accidentRatio > 0.1 && accidentRatio <= 0.15) {
        accidentRatioResults = enterToFacilities ? 15 : 20
    } else if (accidentRatio > 0.15 && accidentRatio <= 0.2) {
        accidentRatioResults = enterToFacilities ? 10 : 15
    } else if (accidentRatio > 0.2 && accidentRatio <= 0.25) {
        accidentRatioResults = enterToFacilities ? 5 : 10
    } else if (accidentRatio > 0.25 && accidentRatio <= 0.3) {
        accidentRatioResults = enterToFacilities ? 0 : 5
    }

    const results = Math.floor(
        (hasQualityCertifiedResults + hasEnvironmentCertifiedResults + hasSstCertifiedResults + hasSupplyChainSafetyCertifiedResults + hasSafetyCertifiedResults + accidentRatioResults) * weightResults
    );
    return results;

}