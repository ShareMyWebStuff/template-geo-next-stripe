/**
 * File structure for the deploy file
 */
export type FileStructure = {
    deployId: number;
    deployType: string;
    deployName: string;
    deployAction: string;
    uninstall: string;
    install: string;
    rollbackAction: string
};
