# logged in landing page : https://leetcode.com

```graphql

query globalData {
    feature {
        questionTranslation
        subscription
        signUp
        discuss
        mockInterview
        contest
        store
        chinaProblemDiscuss
        socialProviders
        studentFooter
        enableChannels
        dangerZone
        enableSharedWorker
        enableRecaptchaV3
        enableDebugger
        enableDebuggerPremium
        enableAutocomplete
        enableAutocompletePremium
        enableAllQuestionsRaw
        autocompleteLanguages
        enableIndiaPricing
        enableReferralDiscount
        maxTimeTravelTicketCount
        enableStoreShippingForm
        enableCodingChallengeV2
        __typename
    }
    streakCounter {
        streakCount
        daysSkipped
        currentDayCompleted
        __typename
    }
    currentTimestamp
    userStatus {
        isSignedIn
        isAdmin
        isStaff
        isSuperuser
        isMockUser
        isTranslator
        isPremium
        isVerified
        checkedInToday
        username
        realName
        avatar
        optedIn
        requestRegion
        region
        activeSessionId
        permissions
        notificationStatus {
            lastModified
            numUnread
            __typename
        }
        completedFeatureGuides
        __typename
    }
    siteRegion
    chinaHost
    websocketUrl
    recaptchaKey
    recaptchaKeyV2
    sitewideAnnouncement
    userCountryCode
}

mutation checkin {
    checkin {
        checkedIn
        ok
        error
        __typename
    }
}
#

query codingChallengeMedal($year: Int!, $month: Int!) {
    dailyChallengeMedal(year: $year, month: $month) {
        name
        config {
            icon
            __typename
        }
        __typename
    }
    activeDailyCodingChallengeQuestion {
        link
        __typename
    }
}

#{"year": 2023, "month": 7}


query trendingDiscuss($first: Int!) {
    cachedTrendingCategoryTopics(first: $first) {
        id
        title
        post {
            id
            creationDate
            contentPreview
            author {
                username
                isActive
                profile {
                    userAvatar
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }
}

#{"first": 10}

query getDidCompleteUpc {
    didCompleteUpc
    user {
        joinedTimestamp
        __typename
    }
}

#

query upcomingContests {
    upcomingContests {
        title
        titleSlug
        startTime
        duration
        __typename
    }
}

# https://leetcode.com/problems/<-----{problem-slug}----->/

query globalData {
    userStatus {
        userId
        isSignedIn
        isMockUser
        isPremium
        isVerified
        username
        avatar
        isAdmin
        isSuperuser
        permissions
        isTranslator
        activeSessionId
        checkedInToday
        notificationStatus {
            lastModified
            numUnread
        }
    }
}

query studyPlanV2RecentCompletedProgress($planSlug: String!) {
    studyPlanV2RecentCompletedProgress(planSlug: $planSlug) {
        id
        status
    }
}
#{"planSlug": ""}

query tabsStatus($titleSlug: String!) {
    questionTopicsList(questionSlug: $titleSlug) {
        totalNum
    }
    questionDiscussionTopic(questionSlug: $titleSlug) {
        topLevelCommentCount
    }
}
#{"titleSlug": "two-sum"}

query questionTitle($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        questionId
        questionFrontendId
        title
        titleSlug
        isPaidOnly
        difficulty
        likes
        dislikes
    }
}
#{"titleSlug": "two-sum"}

query premiumQuestion($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        isPaidOnly
    }
}
#{"titleSlug": "two-sum"}

query SimilarQuestions($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        similarQuestionList {
            difficulty
            titleSlug
            title
            translatedTitle
            isPaidOnly
        }
    }
}
#{"titleSlug": "two-sum"}

query singleQuestionTopicTags($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        topicTags {
            name
            slug
        }
    }
}
#{"titleSlug": "two-sum"}

query userCanSeeQuestion($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        canSeeQuestion
    }
}
#{"titleSlug": "two-sum"}

query consolePanelConfig($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        questionId
        questionFrontendId
        questionTitle
        enableDebugger
        enableRunCode
        enableSubmit
        enableTestMode
        exampleTestcaseList
        metaData
    }
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query questionEditorData($titleSlug: String!) {
question(titleSlug: $titleSlug) {
questionId
questionFrontendId
codeSnippets {
lang
langSlug
code
}
envInfo
enableRunCode
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query languageList {
languageList {
id
name
}
}
-----------------------------------------------------------------------------------

query SurveyV2($surveySlug: String!) {
surveyV2(surveySlug: $surveySlug) {
showSurvey
surveyJson
leetcoinAmount
}
}
{"surveySlug": "javascript_problem_survey"}
-----------------------------------------------------------------------------------

query qdFeatureGuide {
userStatus {
completedFeatureGuides
isSignedIn
}
}
-----------------------------------------------------------------------------------

query annualReport {
userStatus {
annualReport {
showPopup
content
badge {
displayName
medal {
slug
config {
iconGif
}
}
}
}
}
}
-----------------------------------------------------------------------------------

query questionContent($titleSlug: String!) {
question(titleSlug: $titleSlug) {
content
mysqlSchemas
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query qdChallengeQuestion($titleSlug: String!) {
question(titleSlug: $titleSlug) {
challengeQuestion {
id
date
incompleteChallengeCount
streakCount
type
}
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query learningContextName($currentQuestionSlug: String!, $envId: String, $envType: String) {
learningContextV2(
currentQuestionSlug: $currentQuestionSlug
envId: $envId
envType: $envType
needQuestion: false
) {
name
}
}
{"currentQuestionSlug": "two-sum", "filters": {}, "envId": "", "envType": "problem-list"}
{"envType": "", "envId": "", "currentQuestionSlug": "two-sum"}
-----------------------------------------------------------------------------------

query getStreakCounter {
streakCounter {
streakCount
daysSkipped
currentDayCompleted
}
}
-----------------------------------------------------------------------------------

query currentTimestamp {
currentTimestamp
}
-----------------------------------------------------------------------------------

query questionOfToday {
activeDailyCodingChallengeQuestion {
date
userStatus
link
question {
acRate
difficulty
freqBar
frontendQuestionId: questionFrontendId
isFavor
paidOnly: isPaidOnly
status
title
titleSlug
hasVideoSolution
hasSolution
topicTags {
name
id
slug
}
}
}
}
-----------------------------------------------------------------------------------

query questionHints($titleSlug: String!) {
question(titleSlug: $titleSlug) {
hints
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query userQuestionStatus($titleSlug: String!) {
question(titleSlug: $titleSlug) {
status
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query userQuestionLike($titleSlug: String!) {
question(titleSlug: $titleSlug) {
isLiked
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query userFavorites {
favoritesLists {
allFavorites {
idHash
name
isPublicFavorite
questions {
titleSlug
}
}
}
}
-----------------------------------------------------------------------------------

query questionStats($titleSlug: String!) {
question(titleSlug: $titleSlug) {
stats
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query userQuestionAdminUrls($titleSlug: String!) {
question(titleSlug: $titleSlug) {
libraryUrl
adminUrl
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query questionCompanyStats($titleSlug: String!) {
question(titleSlug: $titleSlug) {
companyTagStats
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query discussionTopic($questionSlug: String!) {
questionDiscussionTopic(questionSlug: $questionSlug) {
id
commentCount
topLevelCommentCount
}
}
{"questionSlug": "two-sum"}
-----------------------------------------------------------------------------------

query syncedCode($questionId: Int!, $lang: Int!) {
syncedCode(questionId: $questionId, lang: $lang) {
timestamp
code
}
}
{"lang": 11, "questionId": 34}
-----------------------------------------------------------------------------------

query enableAiHelper {
feature {
enableAiHelper
}
}
-----------------------------------------------------------------------------------

query debuggerLanguageFeatures {
debuggerLanguageFeatures {
lang {
name
}
supportsExpressions
supportsDisablingBreakpoints
supportsDebugging
}
}
-----------------------------------------------------------------------------------

query editorialMeta($titleSlug: String!) {
question(titleSlug: $titleSlug) {
solution {
paidOnly
hasVideoSolution
canSeeDetail
}
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query hasOfficialSolution($titleSlug: String!) {
question(titleSlug: $titleSlug) {
solution {
id
}
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query codingChallengeMedal($year: Int!, $month: Int!) {
dailyChallengeMedal(year: $year, month: $month) {
name
config {
icon
}
}
}
{"year": 2023, "month": 7}
-----------------------------------------------------------------------------------

query submissionList($offset: Int!, $limit: Int!, $lastKey: String, $questionSlug: String!, $lang: Int, $status: Int) {
questionSubmissionList(
offset: $offset
limit: $limit
lastKey: $lastKey
questionSlug: $questionSlug
lang: $lang
status: $status
) {
lastKey
hasNext
submissions {
id
title
titleSlug
status
statusDisplay
lang
langName
runtime
timestamp
url
isPending
memory
hasNotes
notes
}
}
}
{"questionSlug": "two-sum", "offset": 0, "limit": 20, "lastKey": null}
-----------------------------------------------------------------------------------

query submissionFilterTypes {
submittableLanguageList {
id
verboseName
}
statusList {
id
name
}
}
-----------------------------------------------------------------------------------

query questionNote($titleSlug: String!) {
question(titleSlug: $titleSlug) {
questionId
note
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query solutionTags($questionSlug: String!) {
solutionTopicTags(questionSlug: $questionSlug) {
name
slug
count
}
solutionLanguageTags(questionSlug: $questionSlug) {
name
slug
count
}
}
{"questionSlug": "two-sum"}
-----------------------------------------------------------------------------------

query communitySolutions($questionSlug: String!, $skip: Int!, $first: Int!, $query: String, $orderBy: TopicSortingOption, $languageTags: [String!], $topicTags: [String!]) {
questionSolutions(
filters: {questionSlug: $questionSlug, skip: $skip, first: $first, query: $query, orderBy: $orderBy, languageTags: $languageTags, topicTags: $topicTags}
) {
hasDirectResults
totalNum
solutions {
id
title
commentCount
topLevelCommentCount
viewCount
pinned
isFavorite
solutionTags {
name
slug
}
post {
id
status
voteCount
creationDate
isHidden
author {
username
isActive
nameColor
activeBadge {
displayName
icon
}
profile {
userAvatar
reputation
}
}
}
searchMeta {
content
contentType
commentAuthor {
username
}
replyAuthor {
username
}
highlights
}
}
}
}
{"query": "", "languageTags": [], "topicTags": [], "questionSlug": "two-sum", "skip": 30, "first": 15, "orderBy": "hot"}
{"query": "", "languageTags": ["python3"], "topicTags": ["binary-search"], "questionSlug": "two-sum", "skip": 15, "first": 15, "orderBy": "hot"}
{"query": "", "languageTags": [], "topicTags": [], "questionSlug": "two-sum", "skip": 15, "first": 15, "orderBy": "hot"}
{"query": "", "languageTags": [], "topicTags": ["binary-search"], "questionSlug": "two-sum", "skip": 0, "first": 15, "orderBy": "hot"}
{"query": "", "languageTags": [], "topicTags": [], "questionSlug": "two-sum", "skip": 0, "first": 15, "orderBy": "hot"}
{"query": "", "languageTags": ["python3"], "topicTags": ["binary-search"], "questionSlug": "two-sum", "skip": 0, "first": 15, "orderBy": "hot"}
-----------------------------------------------------------------------------------

query officialSolution($titleSlug: String!) {
question(titleSlug: $titleSlug) {
solution {
id
title
content
contentTypeId
paidOnly
hasVideoSolution
paidOnlyVideo
canSeeDetail
rating {
count
average
userRating {
score
}
}
topic {
id
commentCount
topLevelCommentCount
viewCount
subscribed
solutionTags {
name
slug
}
post {
id
status
creationDate
author {
username
isActive
profile {
userAvatar
reputation
}
}
}
}
}
}
}
{"titleSlug": "two-sum"}
-----------------------------------------------------------------------------------

query learningContext($currentQuestionSlug: String!, $categorySlug: String, $envId: String, $envType: String, $filters: QuestionListFilterInput) {
learningContextV2(
currentQuestionSlug: $currentQuestionSlug
categorySlug: $categorySlug
envId: $envId
envType: $envType
filters: $filters
) {
name
backLink
nextQuestion {
difficulty
title
titleSlug
questionFrontendId
}
previousQuestion {
difficulty
title
titleSlug
questionFrontendId
}
}
}
{"currentQuestionSlug": "two-sum", "filters": {}, "envId": "", "envType": "problem-list"}
{"envType": "", "envId": "", "currentQuestionSlug": "two-sum"}
-----------------------------------------------------------------------------------

query randomPanelQuestion($currentQuestionSlug: String!, $categorySlug: String, $envId: String, $envType: String, $filters: QuestionListFilterInput) {
randomPanelQuestion(
currentQuestionSlug: $currentQuestionSlug
categorySlug: $categorySlug
envId: $envId
envType: $envType
filters: $filters
)
}
{"currentQuestionSlug": "two-sum", "filters": {}, "envId": "", "envType": "problem-list"}
{"envType": "", "envId": "", "currentQuestionSlug": "two-sum"}
-----------------------------------------------------------------------------------

query panelQuestionList($currentQuestionSlug: String!, $categorySlug: String, $envId: String, $envType: String, $filters: QuestionListFilterInput) {
panelQuestionList(
currentQuestionSlug: $currentQuestionSlug
categorySlug: $categorySlug
envId: $envId
envType: $envType
filters: $filters
) {
hasViewPermission
panelName
finishedLength
totalLength
questions {
difficulty
id
paidOnly
questionFrontendId
status
title
titleSlug
topicTags {
name
slug
}
}
}
}
{"currentQuestionSlug": "two-sum", "filters": {}, "envId": "", "envType": "problem-list"}
{"envType": "", "envId": "", "currentQuestionSlug": "two-sum"}
-----------------------------------------------------------------------------------

mutation updateSyncedCode($code: String!, $lang: Int!, $questionId: Int!) {
updateSyncedCode(code: $code, lang: $lang, questionId: $questionId) {
ok
}
}
{"code": "class Solution:\n    def searchRange(self, nums: List[int], target: int) -> List[int]:\n        return []", "lang": 11, "questionId": 34}
{"code": "class Solution:\n    def searchRange(self, nums: List[int], target: int) -> List[int]:\n        return [1,2]", "lang": 11, "questionId": 34}
-----------------------------------------------------------------------------------

query questionSubmissionList($questionSlug: String!, $lang: Int, $withNote: Boolean, $limit: Int, $offset: Int, $status: Int) {
questionSubmissionList(
questionSlug: $questionSlug
offset: $offset
limit: $limit
lang: $lang
withNotes: $withNote
status: $status
) {
lastKey
hasNext
submissions {
runtime
memory
timestamp
status
statusDisplay
lang
langName
timestamp
notes
id
hasNotes
topicTags {
id
name
slug
translatedName
}
}
}
}
{"questionSlug": "two-sum", "limit": 10, "offset": 0, "lang": 11, "withNote": true, "status": 10}
-----------------------------------------------------------------------------------

query submissionDetails($submissionId: Int!) {
submissionDetails(submissionId: $submissionId) {
runtime
runtimeDisplay
runtimePercentile
runtimeDistribution
memory
memoryDisplay
memoryPercentile
memoryDistribution
code
timestamp
statusCode
user {
username
profile {
realName
userAvatar
}
}
lang {
name
verboseName
}
question {
questionId
}
notes
topicTags {
tagId
slug
name
}
runtimeError
compileError
lastTestcase
}
}
{"submissionId": 989723806}
-----------------------------------------------------------------------------------

query communitySolution($topicId: Int!) {
topic(id: $topicId) {
id
viewCount
topLevelCommentCount
subscribed
title
pinned
solutionTags {
name
slug
}
hideFromTrending
commentCount
isFavorite
post {
id
voteCount
voteStatus
content
updationDate
creationDate
status
isHidden
author {
isDiscussAdmin
isDiscussStaff
username
nameColor
activeBadge {
displayName
icon
}
profile {
userAvatar
reputation
}
isActive
}
authorIsModerator
isOwnPost
}
}
}
{"topicId": 3678229}
-----------------------------------------------------------------------------------

query solutionArticleInformation($topicId: Int!) {
topic(id: $topicId) {
title
post {
author {
username
}
}
}
}
{"topicId": 3678229}
-----------------------------------------------------------------------------------

query prevNextSolution($topicId: Int!, $questionSlug: String!, $skip: Int!, $first: Int!, $query: String, $orderBy: TopicSortingOption, $languageTags: [String!], $topicTags: [String!]) {
prevSolution(
topicId: $topicId
filters: {questionSlug: $questionSlug, first: $first, skip: $skip, orderBy: $orderBy, query: $query, languageTags: $languageTags, topicTags: $topicTags}
) {
id
title
}
nextSolution(
topicId: $topicId
filters: {questionSlug: $questionSlug, first: $first, skip: $skip, orderBy: $orderBy, query: $query, languageTags: $languageTags, topicTags: $topicTags}
) {
id
title
}
}
{"query": "", "languageTags": [], "topicTags": [], "topicId": 3678229, "topicSlug": "", "questionSlug": "two-sum", "skip": 0, "first": 15, "orderBy": "hot"}
-----------------------------------------------------------------------------------

query intentionTags {
intentionTags {
name
slug
}
}
-----------------------------------------------------------------------------------

query questionDiscussComments($topicId: Int!, $orderBy: String = "newest_to_oldest", $pageNo: Int = 1, $numPerPage: Int = 10) {
topicComments(
topicId: $topicId
orderBy: $orderBy
pageNo: $pageNo
numPerPage: $numPerPage
) {
data {
id
pinned
pinnedBy {
username
}
post {
...DiscussPost
}
intentionTag {
slug
}
numChildren
}
totalNum
}
}

fragment DiscussPost on PostNode {
id
voteCount
voteStatus
content
updationDate
creationDate
status
isHidden
coinRewards {
id
score
description
date
}
author {
isDiscussAdmin
isDiscussStaff
username
nameColor
activeBadge {
displayName
icon
}
profile {
userAvatar
reputation
}
isActive
}
authorIsModerator
isOwnPost
}
{"topicId": 3678229, "pageNo": 1, "numPerPage": 10, "orderBy": "best"}
-----------------------------------------------------------------------------------

# https://leetcode.com/problemset/all/

query globalData {
userStatus {
userId
isSignedIn
isMockUser
isPremium
isVerified
username
avatar
isAdmin
isSuperuser
permissions
isTranslator
activeSessionId
checkedInToday
notificationStatus {
lastModified
numUnread
}
}
}
-----------------------------------------------------------------------------------

query siteAnnouncements {
siteAnnouncements {
title
content
blacklistUrls
whitelistUrls
navbarItem
}
}
-----------------------------------------------------------------------------------

query GetProblemSetStudyPlanAds {
studyPlansV2AdQuestionPage {
cover
highlight
name
onGoing
premiumOnly
questionNum
slug
}
}
-----------------------------------------------------------------------------------

query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
problemsetQuestionList: questionList(
categorySlug: $categorySlug
limit: $limit
skip: $skip
filters: $filters
) {
total: totalNum
questions: data {
acRate
difficulty
freqBar
frontendQuestionId: questionFrontendId
isFavor
paidOnly: isPaidOnly
status
title
titleSlug
topicTags {
name
id
slug
}
hasSolution
hasVideoSolution
}
}
}
{"categorySlug": "", "skip": 0, "limit": 50, "filters": {}}
-----------------------------------------------------------------------------------

query questionOfToday {
activeDailyCodingChallengeQuestion {
date
userStatus
link
question {
acRate
difficulty
freqBar
frontendQuestionId: questionFrontendId
isFavor
paidOnly: isPaidOnly
status
title
titleSlug
hasVideoSolution
hasSolution
topicTags {
name
id
slug
}
}
}
}
-----------------------------------------------------------------------------------

query codingChallengeMedal($year: Int!, $month: Int!) {
dailyChallengeMedal(year: $year, month: $month) {
name
config {
icon
}
}
}
{"year": 2023, "month": 7}
-----------------------------------------------------------------------------------

query currentTimestamp {
currentTimestamp
}
-----------------------------------------------------------------------------------

query GetMyStudyPlan($progressType: PlanUserProgressTypeEnum!, $offset: Int!, $limit: Int!) {
studyPlanV2UserProgresses(
progressType: $progressType
offset: $offset
limit: $limit
) {
hasMore
total
planUserProgresses {
nextQuestionInfo {
inPremiumSubgroup
nextQuestion {
id
questionFrontendId
title
titleSlug
translatedTitle
}
}
quittedAt
startedAt
plan {
questionNum
slug
premiumOnly
name
onGoing
highlight
cover
}
latestSubmissionAt
id
allCompletedAt
finishedQuestionNum
}
}
}
{"offset": 0, "limit": 3, "progressType": "ON_GOING"}
-----------------------------------------------------------------------------------

query dailyCodingQuestionRecords($year: Int!, $month: Int!) {
dailyCodingChallengeV2(year: $year, month: $month) {
challenges {
date
userStatus
link
question {
questionFrontendId
title
titleSlug
}
}
weeklyChallenges {
date
userStatus
link
question {
questionFrontendId
title
titleSlug
}
}
}
}
{"year": 2023, "month": 7}
-----------------------------------------------------------------------------------

query upcOnboardingStatus {
didCompleteUpc
user {
joinedTimestamp
}
}
-----------------------------------------------------------------------------------

query getStreakCounter {
streakCounter {
streakCount
daysSkipped
currentDayCompleted
}
}
-----------------------------------------------------------------------------------

query timeTravelTicketInfo {
validTimeTravelTicketCount
redeemedTimeTravelTicketCount
}
-----------------------------------------------------------------------------------

query userSessionProgress($username: String!) {
allQuestionsCount {
difficulty
count
}
matchedUser(username: $username) {
submitStats {
acSubmissionNum {
difficulty
count
submissions
}
totalSubmissionNum {
difficulty
count
submissions
}
}
}
}
{"username": "user8162l"}
-----------------------------------------------------------------------------------

query globalData {
userStatus {
userId
isSignedIn
isMockUser
isPremium
isVerified
username
avatar
isAdmin
isSuperuser
permissions
isTranslator
activeSessionId
checkedInToday
notificationStatus {
lastModified
numUnread
}
}
}
-----------------------------------------------------------------------------------

query siteAnnouncements {
siteAnnouncements {
title
content
blacklistUrls
whitelistUrls
navbarItem
}
}
-----------------------------------------------------------------------------------

query userPublicProfile($username: String!) {
matchedUser(username: $username) {
contestBadge {
name
expired
hoverText
icon
}
username
githubUrl
twitterUrl
linkedinUrl
profile {
ranking
userAvatar
realName
aboutMe
school
websites
countryName
company
jobTitle
skillTags
postViewCount
postViewCountDiff
reputation
reputationDiff
solutionCount
solutionCountDiff
categoryDiscussCount
categoryDiscussCountDiff
}
}
}
{"username": "user8162l"}
-----------------------------------------------------------------------------------

query languageStats($username: String!) {
matchedUser(username: $username) {
languageProblemCount {
languageName
problemsSolved
}
}
}
{"username": "user8162l"}
-----------------------------------------------------------------------------------

query skillStats($username: String!) {
matchedUser(username: $username) {
tagProblemCounts {
advanced {
tagName
tagSlug
problemsSolved
}
intermediate {
tagName
tagSlug
problemsSolved
}
fundamental {
tagName
tagSlug
problemsSolved
}
}
}
}
{"username": "user8162l"}
-----------------------------------------------------------------------------------

query userContestRankingInfo($username: String!) {
userContestRanking(username: $username) {
attendedContestsCount
rating
globalRanking
totalParticipants
topPercentage
badge {
name
}
}
userContestRankingHistory(username: $username) {
attended
trendDirection
problemsSolved
totalProblems
finishTimeInSeconds
rating
ranking
contest {
title
startTime
}
}
}
{"username": "user8162l"}
-----------------------------------------------------------------------------------

query userProblemsSolved($username: String!) {
allQuestionsCount {
difficulty
count
}
matchedUser(username: $username) {
problemsSolvedBeatsStats {
difficulty
percentage
}
submitStatsGlobal {
acSubmissionNum {
difficulty
count
}
}
}
}
{"username": "user8162l"}
-----------------------------------------------------------------------------------

query userBadges($username: String!) {
matchedUser(username: $username) {
badges {
id
name
shortName
displayName
icon
hoverText
medal {
slug
config {
iconGif
iconGifBackground
}
}
creationDate
category
}
upcomingBadges {
name
icon
progress
}
}
}
{"username": "user8162l"}
-----------------------------------------------------------------------------------

query userProfileCalendar($username: String!, $year: Int) {
matchedUser(username: $username) {
userCalendar(year: $year) {
activeYears
streak
totalActiveDays
dccBadges {
timestamp
badge {
name
icon
}
}
submissionCalendar
}
}
}
{"username": "user8162l"}
-----------------------------------------------------------------------------------

query recentAcSubmissions($username: String!, $limit: Int!) {
recentAcSubmissionList(username: $username, limit: $limit) {
id
title
titleSlug
timestamp
}
}
{"username": "user8162l", "limit": 15}
-----------------------------------------------------------------------------------

query getStreakCounter {
streakCounter {
streakCount
daysSkipped
currentDayCompleted
}
}
-----------------------------------------------------------------------------------

query currentTimestamp {
currentTimestamp
}
-----------------------------------------------------------------------------------

query questionOfToday {
activeDailyCodingChallengeQuestion {
date
userStatus
link
question {
acRate
difficulty
freqBar
frontendQuestionId: questionFrontendId
isFavor
paidOnly: isPaidOnly
status
title
titleSlug
hasVideoSolution
hasSolution
topicTags {
name
id
slug
}
}
}
}
-----------------------------------------------------------------------------------

query codingChallengeMedal($year: Int!, $month: Int!) {
dailyChallengeMedal(year: $year, month: $month) {
name
config {
icon
}
}
}
{"year": 2023, "month": 7}
-----------------------------------------------------------------------------------

query getUserProfile($username: String!) {
matchedUser(username: $username) {
activeBadge {
displayName
icon
}
}
}
{"username": "user8162l"}
-----------------------------------------------------------------------------------

```
