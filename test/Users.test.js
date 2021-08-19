
const Users = artifacts.require('./Users.sol')

contract('Users', (accounts) => {

  let usersContract;

  let [ owner, user1_group1, user2_group1, user3_group2, user4_group2 ] = accounts;

  beforeEach( async () => {
    usersContract = await Users.new();
  })

  it('exists', () => {
      expect(true).to.equal(true);
  })

  it('creates 2 groups and adds two users to each', async () => {

    const mockGroup1Id = 111;
    const mockGroup2Id = 222;

    await usersContract.addUserToGroup(mockGroup1Id, user1_group1, { from: owner });
    await usersContract.addUserToGroup(mockGroup1Id, user2_group1, { from: owner });
    await usersContract.addUserToGroup(mockGroup2Id, user3_group2, { from: owner });
    await usersContract.addUserToGroup(mockGroup2Id, user4_group2, { from: owner });

    const actualIndex_User1 = await usersContract.myIndex(mockGroup1Id, { from: user1_group1 });
    const actualIsInGroup_User1 = await usersContract.isInGroup(mockGroup1Id, { from: user1_group1 });
    
    expect(actualIndex_User1.toNumber()).to.equal(1);
    expect(actualIsInGroup_User1).to.equal(true);
    
    const wrongGroupIndex_User1 = await usersContract.myIndex(mockGroup2Id, { from: user1_group1 });
    const wrongGroupIsInGroup_User1 = await usersContract.isInGroup(mockGroup2Id, { from: user1_group1 });

    expect(wrongGroupIndex_User1.toNumber()).to.equal(0);
    expect(wrongGroupIsInGroup_User1).to.equal(false);

    const actualIndex_User2 = await usersContract.myIndex(mockGroup1Id, { from: user2_group1 });
    const actualIsInGroup_User2 = await usersContract.isInGroup(mockGroup1Id, { from: user2_group1 });
    
    expect(actualIndex_User2.toNumber()).to.equal(2);
    expect(actualIsInGroup_User2).to.equal(true);
    
    const actualIndex_User3 = await usersContract.myIndex(mockGroup2Id, { from: user3_group2 });
    const actualIsInGroup_User3 = await usersContract.isInGroup(mockGroup2Id, { from: user3_group2 });
    
    expect(actualIndex_User3.toNumber()).to.equal(1);
    expect(actualIsInGroup_User3).to.equal(true);

    const actualIndex_User4 = await usersContract.myIndex(mockGroup2Id, { from: user4_group2 });
    const actualIsInGroup_User4 = await usersContract.isInGroup(mockGroup2Id, { from: user4_group2 });
    
    expect(actualIndex_User4.toNumber()).to.equal(2);
    expect(actualIsInGroup_User4).to.equal(true);

  })

})
