const { gql } = require("graphql-tag");

module.exports = gql`
type TrackingProject {
    id:Int
    numberCreate:Int
    numberUpdate:Int
    numberDelete:Int
    user:User

}
type TackingParametters {
    trackingProjects:[TrackingProject]
    totalCreate:Int
    totalDelete:Int
    totalUpdate:Int
}

type Query {
    getTrackingProjects:TackingParametters
}
`;