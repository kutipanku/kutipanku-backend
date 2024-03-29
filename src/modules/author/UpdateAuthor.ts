import { Resolver, Mutation, Arg } from 'type-graphql';
import { Author } from '../../entity/Author';
import { EditAuthorInput } from './input/EditAuthorInput';

@Resolver(Author)
export class UpdateAuthorResolver {
  /* ------------------------------------
  => Edit author based on Id
  ------------------------------------ */
  @Mutation(() => Author)
  async updateAuthor(
    @Arg('data')
    { id, name, pictureUrl }: EditAuthorInput
  ): Promise<Author | null> {
    const author = await Author.findOne({ where: { id } });
    if (!author) {
      return null;
    } else {
      author.name = name;
      author.pictureUrl = pictureUrl;
      await author.save();
    }

    return author;
  }
}
