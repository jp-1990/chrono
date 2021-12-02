export enum ModalTypeEnum {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export interface ModalState {
  open: boolean;
  type: ModalTypeEnum;
}
