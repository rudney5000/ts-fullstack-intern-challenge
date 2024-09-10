import { Repository } from "typeorm";
import dataSource from "../data-source";
import Like from "../entity/Like";
import LikeDto from "../../../api/src/dto/like.dto";

export default class LikeService {
  private repository: Repository<Like>;

  constructor() {
    this.repository = dataSource.getRepository(Like);
  }

  public async getLikes(user_id: number): Promise<Like[] | []> {
    const likes = await this.repository.find({ where: { user_id } });
    return likes;
  }

  public async postLike(likeDto: LikeDto): Promise<Like> {
    const like = this.repository.create(likeDto);
    return await this.repository.save(like);
  }

  public async deleteLike(cat_id: string): Promise<void> {
    const likeId = await this.repository.findOne({ where: { cat_id } });
    await this.repository.delete(likeId);
  }
}

