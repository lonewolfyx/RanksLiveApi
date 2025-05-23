import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDescription } from '@/common/decorator/api.description.decorator'
import { OschinaService } from '@/modules/oschina/oschina.service'
import { OschinaBlogParamDto, OschinaGroupParamDto } from '@/modules/oschina/oschina.dto'
import { ApiMaintainers } from '@/common/decorator/api.maintainers.decorator'
import { SourceUrl } from '@/common/decorator/source.url.decorator'
import { oschinaBlogArticle } from '@/modules/oschina/constants/oschina.constants'

@Controller('oschina')
@ApiTags('开源中国')
export class OschinaController {
    constructor(private readonly oschinaService: OschinaService) {}

    @Get('groups/:type')
    @ApiDescription('获取开源中国专区最新文章')
    @ApiMaintainers('lonewolfyx')
    @SourceUrl('https://www.oschina.net/groups/')
    async getGroupsNew(@Param() param: OschinaGroupParamDto) {
        const { type } = param
        return await this.oschinaService.getGroupsNewListByWeb(type)
    }

    @Get('rank/read')
    @ApiDescription('获取开源中国阅读榜单')
    @ApiMaintainers('lonewolfyx')
    @SourceUrl('https://www.oschina.net/readingList/')
    async getRankRead() {
        return await this.oschinaService.getRankRead()
    }

    @Get('headline')
    @ApiDescription('获取开源中国 · 头条推荐')
    @ApiMaintainers('lonewolfyx')
    @SourceUrl('https://www.oschina.net/index/')
    async getHeadline() {
        return await this.oschinaService.getHeadline()
    }

    @Get('topic')
    @ApiDescription('获取开源中国 · 热门话题')
    @ApiMaintainers('lonewolfyx')
    @SourceUrl('https://www.oschina.net/index/')
    async getTweetTopic() {
        return await this.oschinaService.getTweetTopic()
    }

    @Get('blog/:type/:sort')
    @ApiDescription('获取开源中国 · 文章博客')
    @ApiMaintainers('lonewolfyx')
    @SourceUrl('https://www.oschina.net/blog_beta')
    async getTBlogRankList(@Param() param: OschinaBlogParamDto) {
        const { type, sort } = param
        return await this.oschinaService.getTBlogRankList(oschinaBlogArticle[type]['id'], sort)
    }
}
