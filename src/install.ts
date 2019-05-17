import {autoBuildFlags, isAutoBuildEnabled, isInstallDisabled, isWithoutContrib, opencvVersion} from "./env";
import {installOpenCV, setupOpencv} from "./setupOpencv";
import {requireCmake, requireGit} from "./utils";

const log = require("npmlog");

export async function install() {
    if (isAutoBuildEnabled()) {
        log.info("install", "");
        log.info("install", "running install script...");
        log.info("install", "");
        log.info("install", "opencv version: %s", opencvVersion());
        log.info(
            "install",
            "with opencv contrib: %s",
            isWithoutContrib() ? "no" : "yes"
        );
        log.info("install", "custom build flags: %s", autoBuildFlags());
        log.info("install", "");

        try {
            await requireGit();
            await requireCmake();
            await setupOpencv();
        } catch (err) {
            log.error(err);
            process.exit(1);
        }
    }
    if (!isInstallDisabled()) {
        try {
            log.info("Moving files", "");
            await installOpenCV();
        } catch (e) {
            log.error(e);
            process.exit(1);
        }
    }
}
