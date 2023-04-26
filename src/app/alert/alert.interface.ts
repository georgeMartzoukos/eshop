export interface Alert {
    type?: 'primary' | 'info' | 'succes' | 'danger' | 'warning';
    heading?: string;
    text: string;
    spinner?: boolean;
}