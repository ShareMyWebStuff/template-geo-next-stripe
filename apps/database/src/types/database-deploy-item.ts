import { RowDataPacket } from 'mysql2';

export interface DatabaseDeployItem extends RowDataPacket {
    deploy_id: number;
    deployType: string;
    deployName: string;
    deployAction: string;
    uninstall: string;
    install: string;
    rollbackAction: string;
    status: string;
    created_at: Date;
}
