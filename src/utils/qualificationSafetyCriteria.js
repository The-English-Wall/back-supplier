export const qualificationSafetyResults = async (data) => {
    const { hasSarlaftSystems, hasSagrilaftSystems, hasSiplaftSystems, hasOfacReport } = data;


    const weightResults = 0.25;
    let hasSarlaftSystemsResults = 0,
        hasSagrilaftSystemsResults = 0,
        hasSiplaftSystemsResults = 0,
        hasOfacReportResults = 0

    if (!hasSarlaftSystems.notApplicable && hasSarlaftSystems.hasSystem) {
        hasSarlaftSystemsResults = 20
    }
    if (!hasSagrilaftSystems.notApplicable && hasSagrilaftSystems.hasSystem) {
        hasSagrilaftSystemsResults = 15
    }
    if (!hasSiplaftSystems.notApplicable && hasSiplaftSystems.hasSystem) {
        hasSiplaftSystemsResults = 15
    }
    if (!hasOfacReport) {
        hasOfacReportResults = 50
    }

    const results = Math.floor(
        (hasSarlaftSystemsResults + hasSagrilaftSystemsResults + hasSiplaftSystemsResults + hasOfacReportResults) * weightResults
    );

    return results;
}