import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'secrets_task',
})
export default class TaskEntity implements Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '微信用户 openid',
    update: false,
  })
  openid: string;

  @Column({
    comment: '一级目录',
  })
  catalog: string;

  @Column({
    comment: '任务标题',
  })
  title: string;

  @Column({
    comment: '任务描述',
  })
  taskDesc?: string;

  @Column({
    comment: '任务截止时间',
    update: false,
  })
  deadline: string;

  @Column({
    comment: '任务第一次编辑的时间',
    update: false,
  })
  registerDate: string;

  @Column({
    comment: '任务最后一次更新的时间',
  })
  lastUpdateDate: string;

  @Column({
    comment: '任务完成标志',
    update: false,
  })
  done: boolean;

  @Column({
    comment: '任务完成时间',
    update: false,
  })
  doneDate: string;

  @Column({
    comment: '任务完成的文本描述',
  })
  doneDesc: string;

  @Column({
    comment: '任务完成的附件地址',
  })
  doneAttachMent: string;
}
